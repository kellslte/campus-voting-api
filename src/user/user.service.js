import User from "../models/user.model.js";
import * as roleService from "./role.service.js";
import { validateEmail } from "../lib/utils.js";
import { hash } from "argon2";

// Get all users
export async function getAllUsers() {
  return await User.findAll({ include: [{ model: Role }] });
}

// Get all Admins
export async function getAllAdmins() {
  const adminRole = await roleService.getRoleByName("Admin");

  return await User.findAll({
    where: { roleId: adminRole.dataValues.id },
  });
}

// Create Admin
export async function createAdmin(userData) {
  const adminRole = await roleService.getRoleByName("Admin");

  // Map user data first, waiting for all password hashes to complete
  const hashedUserData = await Promise.all(
    userData.map(async (user) => ({
      name: user.name,
      email: user.email,
      password: await hash(user.password),
      roleId: adminRole.dataValues.id,
    }))
  );

  // Then bulk create with the prepared data
  return await User.bulkCreate(hashedUserData);
}

// Get user by identifier
export async function getUserByIdentifier(identifier) {
  const isEmail = validateEmail(identifier);

  const user = isEmail
    ? await User.findOne({
        where: { email: identifier },
      })
    : await User.findOne({
        where: { student_id: identifier },
      });

  if (!user) return null;

  const role = await roleService.getRoleById(user.dataValues.roleId);
  user.role = role.dataValues;

  return user;
}

// Create a new user
export async function createUser(userData) {
  // Get role in a single query using default "Voter" if not specified
  const role = await roleService.getRoleByName(userData.role || "Voter");

  // Create user with role ID
  return await User.create({
    ...userData,
    roleId: role.dataValues.id,
  });
}

// Update user by identifier
export async function updateUserByIdentifier(identifier, updatedData) {
  const user = await getUserByIdentifier(identifier);

  return await user.update(updatedData);
}

// Delete user by identifier
export async function deleteUserByIdentifier(identifier) {
  const user = await getUserByIdentifier(identifier);

  return await user.destroy();
}

// Update user role
export async function updateUserRole(identifier, role) {
  const user = await getUserByIdentifier(identifier);

  if (!user) return null;

  const newRole = await roleService.getRoleByName(role);

  return await user.update({ roleId: newRole.dataValues.id });
}
