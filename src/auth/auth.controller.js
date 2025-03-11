import * as authService from "./auth.service.js";
import { CreateUserRequest, SignInUserRequest } from "./auth.request.js";
import { asyncWrapper } from "../lib/utils.js";
import validator from "../common/providers/validator.provider.js";
import { ValidationException } from "../common/classes/error-definitions.class.js";
import { convertHumanReadbleTimeToMilliseconds } from "../lib/utils.js";
import ConfigService from "../common/classes/config-service.class.js";

// Create a new user
export const createUser = asyncWrapper(async (req, res) => {
  const { body } = req;
  const { value, errors } = validator.validate(CreateUserRequest, body);

  if (errors)
    throw new ValidationException(
      "The request failed witht the following errors",
      errors
    );

  const createdUser = await authService.createUserAccount(value);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: { user: createdUser },
  });
});

// Sign in a user
export const signIn = asyncWrapper(async (req, res) => {
  const { body } = req;
  const { value, errors } = validator.validate(SignInUserRequest, body);

  if (errors)
    throw new ValidationException(
      "The request failed witht the following errors",
      errors
    );

  const identifier = value.email ? value.email : value.student_id;

  const token = await authService.authenticateUser(identifier, value.password);

  res.cookie("token", token, {
    expires: new Date(
      Date.now() +
        convertHumanReadbleTimeToMilliseconds(
          ConfigService.getOrThrow("jwt_expires_in")
        )
    ),
    httpOnly: true,
    secure: ConfigService.getOrThrow("node_env") === "production", // Set to true if using HTTPS
  });

  res.status(200).json({
    success: true,
    message: "User signed in successfully",
  });
} );

// Get authenticated user
export const getAuthenticatedUser = asyncWrapper(async (req, res) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    message: "User retrieved successfully",
    data: { user },
  });
});
