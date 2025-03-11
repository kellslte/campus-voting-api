import Joi from "joi";

export const CreateUserRequest = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string(),
});

export const SignInUserRequest = Joi.object({
  email: Joi.string().email(),
  student_id: Joi.string(),
  password: Joi.string().required(),
});
