import catchAsync from "../../helpers/catchAsync.js";
import Role from "../../db/model/roles.js";
import UserRoles from "../../db/model/userRoles.js";
import { handleResponse } from "../../helpers/requestHandler.js";

const createRole = catchAsync(async (req, res) => {
  const role = new Role(req.body);
  await role.save();
  handleResponse({ res, data: role, msg: "Success" });
});

const assignRole = catchAsync(async (req, res) => {
  const role = new UserRoles(req.body);
  await role.save();
  handleResponse({ res, data: role, msg: "Success" });
});

const read = catchAsync(async (req, res) => {
  const roles = await UserRoles.find().populate("role_id").populate("user_id");
  handleResponse({ res, data: roles, msg: "Success" });
});

const deleteRole = catchAsync(async (req, res) => {
  const { id } = req.params;

  const usersWithRole = await Role.find({ roles: id });

  if (usersWithRole.length > 0) {
    return handleError({
      res,
      err: "Role is assigned to users and cannot be deleted.",
    });
  }

  await Role.findByIdAndRemove(id);
  handleResponse({ res, data: {}, msg: "Role deleted" });
});

const update = catchAsync(async (req, res) => {
  const { id } = req.params;
  await Role.findByIdAndUpdate(id, req.body, { new: true });
  handleResponse({ res, data: {}, msg: "Success" });
});

export default {
  createRole,
  read,
  deleteRole,
  update,
  assignRole,
};
