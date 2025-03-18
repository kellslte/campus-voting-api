import {
  closeDatabaseConnection,
  initializeDatabaseConnection,
} from "../common/providers/database.provider.js";
import Role from "../models/role.model.js";
import { createAdmin, getAllAdmins } from "../user/user.service.js";

export function convertHumanReadbleTimeToMilliseconds(time) {
  const unit = time.split("")[1];
  const value = parseFloat(time.split("")[0]);

  switch (unit) {
    case "m":
      return value * 1000 * 60;

    case "h":
      return value * 1000 * 60 * 60;

    case "d":
      return value * 1000 * 24 * 60 * 60;

    case "w":
      return value * 1000 * 7 * 24 * 60 * 60;

    default:
      throw new Error(`Invalid time unit: ${unit}`);
  }
}

export function asyncWrapper(fn) {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function generateRandomString(length) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function seedRolesTable() {
  await initializeDatabaseConnection();
  const roles = ["Admin", "Voter", "Candidate"];
  // Bulk create if the role does not exist
  if ((await Role.count()) === 0)
    // Only create if roles table is empty
    await Role.bulkCreate(roles.map((name) => ({ name })));

  await closeDatabaseConnection();
  console.log("Roles table seeded successfully");
}

export async function seedAdminsTable() {
  await initializeDatabaseConnection();
  const admins = [
    {
      name: "Benjamin Ojogwu",
      email: "benjogwu@unii.edu.ng",
      password: "seri0u$ly_S3kur3",
    },
  ];

  // Bulk create if the role does not exist
  if ((await getAllAdmins()).length === 0)
    // Only create if roles table is empty
    createAdmin(admins).then(async () => {
      console.info("Admins created!");
      await closeDatabaseConnection();
    });
}

export const generateFullPhotoUrl = (req) => {
  const serverUrl = `${req.protocol}://${req.get("host")}`;
  return `${serverUrl}/assets/images/${req.file.filename}`;
};
