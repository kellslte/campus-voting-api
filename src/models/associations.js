import Profile from "./profile.model.js";
import Role from "./role.model.js";
import User from "./user.model.js";

export default function setupAssociations() {
  // User associations
  User.hasOne(Profile, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });
  User.belongsTo(Role, {
    foreignKey: "roleId",
    as: "role",
  });

  // Profile Associations
  Profile.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  // Role Associations
  Role.hasMany(User, {
    foreignKey: "roleId",
    as: "users",
  } );
  
  console.log("Model associations loaded successfully");
}
