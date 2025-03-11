import User from "../models/user.model.js";
import Role from "../models/role.model.js";
import { validateEmail } from "../lib/utils.js";

// Get all users
export async function getAllUsers() {
  return await User.findAll({ include: [{ model: Role }] });
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
    } );
  
  const role = await Role.findByPk( user.roleId );
  user.role = role;

  return user;
}

// Create a new user
export async function createUser(userData) {
  const role = userData.role
    ? await Role.findOne({ name: userData.role })
    : await Role.findOne({ name: "Voter" });
  return await User.create({
    ...userData,
    roleId: role.id,
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
