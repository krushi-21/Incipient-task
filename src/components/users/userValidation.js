import Joi from "joi";
import catchAsync from "../../helpers/catchAsync.js";

export const createUserRequest = catchAsync(async (req, res, next) => {
  const schema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    code: Joi.string().required(),
    images: Joi.array().required(),
    password: Joi.string().required(),
  });

  await schema.validateAsync(req.body);
  next();
});
