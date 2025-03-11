import sequelize from "../common/providers/database.provider.js";
import { DataTypes } from "sequelize";
import { generateRandomString } from "../lib/utils.js";
import argon from "argon2";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  student_id: {
    type: DataTypes.STRING,
    defaultValue: generateRandomString(8),
  },
  password: DataTypes.STRING,
  roleId: {
    type: DataTypes.UUID,
    references: {
      model: "Roles",
      key: "id",
    },
    allowNull: false,
  },
});

User.beforeSave(async function (user) {
  if (user.changed("password")) {
    user.password = await argon.hash(user.password);
  }
});

export default User;
