import { DataTypes } from "sequelize";
import sequelize from "../common/providers/database.provider.js";

const Role = sequelize.define("Role", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
} );

export default Role;
