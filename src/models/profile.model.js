import sequelize from "../common/providers/database.provider.js";
import { Sequelize, DataTypes } from "sequelize";
import User from "./user.model.js";

export const studentGovernmentPositions = [
  "President",
  "Vice President",
  "Secretary",
  "Treasurer",
  "Director of Socials",
  "Director of Games",
];

const Profile = sequelize.define("Profile", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: "Users",
      key: "id",
    },
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  middlename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  photo: DataTypes.TEXT,
  manifesto: {
    type: DataTypes.TEXT,
  },
  position: {
    type: DataTypes.ENUM({
      values: studentGovernmentPositions,
    }),
    allowNull: false,
  },
});

export default Profile;
