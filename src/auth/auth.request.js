import Joi from "joi";

export const CreateUserRequest = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string(),
});

export const SignInUserRequest = Joi.object({
  identifier: Joi.alternatives()
    .try(
      Joi.string().email().messages({ "string.email": "Invalid email format" }),
      Joi.string().min(3).max(50).messages({
        "string.min": "Must be at least 3 characters",
        "string.max": "Cannot exceed 50 characters",
      })
    )
    .required()
    .messages({ "any.required": "Identifier is required" }),
  password: Joi.string().required(),
});
