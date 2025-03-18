import Role from "../models/role.model.js";

export async function getAllRoles() {
  return await Role.findAll();
}

// get role by name
export async function getRoleByName(name) {
  return await Role.findOne({ where: { name } });
}

// get role by id
export async function getRoleById(id) {
  return await Role.findByPk(id);
}

// Create a new role
export async function createRole(roleData) {
  return await Role.create(roleData);
}

// Update role by ID
export async function updateRoleById(id, updatedData) {
  const role = await Role.findByPk(id);

  if (!role) return null;

  return await role.update(updatedData);
}

// Delete role by ID
export async function deleteRoleById(id) {
  const role = await Role.findByPk(id);

  if (!role) return null;

  return await role.destroy();
}
