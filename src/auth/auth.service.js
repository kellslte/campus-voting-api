import * as userService from "../user/user.service.js";
import argon from "argon2";
import jwtProvider from "../common/providers/jwt.provider.js";
import {
  ConflictException,
  UnauthenticatedException,
} from "../common/classes/error-definitions.class.js";

// Authenticate User
export async function authenticateUser(identifier, password) {
  const user = await userService.getUserByIdentifier(identifier);

  if (!user) throw new UnauthenticatedException("Invalid credentials");

  const isMatch = await argon.verify(user.password, password);

  if (!isMatch) throw new UnauthenticatedException("Invalid credentials");

  const token = jwtProvider.generateAuthenticationToken({
    userId: user.id,
    email: user.email,
    studentId: user.student_id,
    role: user.role.name
  });

  return token;
}

// Create User Account
export async function createUserAccount(userData) {
  const user = await userService.getUserByIdentifier(userData.email);

  if (user)
    throw new ConflictException(
      "A record already exists for a user with these details"
    );

  const newUser = await userService.createUser(userData);

  return {
    id: newUser.id,
    email: newUser.email,
    student_id: newUser.student_id,
  };
}
