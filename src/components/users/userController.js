import catchAsync from "../../helpers/catchAsync.js";
import User from "../../db/model/userModel.js";
import UserImage from "../../db/model/userImages.js";
import { handleError, handleResponse } from "../../helpers/requestHandler.js";
import UserImages from "../../db/model/userImages.js";
import UserRoles from "../../db/model/userRoles.js";

const create = catchAsync(async (req, res) => {
  const user = await User.create(req.body);

  if (req.body.images && Array.isArray(req.body.images)) {
    const userImages = await UserImage.create({
      user_id: user._id,
      image: req.body.images,
    });

    user.images = userImages._id;
  }
  await user.save();

  delete user.password;
  handleResponse({ res, data: user, msg: "Success" });
});

const read = catchAsync(async (req, res) => {
  const _id = req.params.id;

  const user = await User.findById(_id);
  if (user.deleted) {
    return handleError({
      res,
      err: "User not found !!",
      statusCode: 404,
      data: {},
    });
  }

  const roles = await UserRoles.find({
    user_id: user._id,
  }).populate("role_id");
  const images = await UserImages.find({ user_id: user._id });
  handleResponse({ res, data: { user, roles, images }, msg: "Success" });
});

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;

  await User.findByIdAndUpdate(id, { deleted: true });
  handleResponse({ res, data: {}, msg: "Success" });
});

const update = catchAsync(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, req.body, { new: true });
  handleResponse({ res, data: {}, msg: "Success" });
});

export default {
  create,
  read,
  deleteUser,
  update,
};
