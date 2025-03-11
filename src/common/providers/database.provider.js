import { Sequelize } from "sequelize";
import ConfigService from "../classes/config-service.class.js";

const sequelize = new Sequelize({
  host: ConfigService.getOrThrow("db_host"),
  dialect: "postgres",
  username: ConfigService.getOrThrow("db_user"),
  password: ConfigService.getOrThrow("db_pass"),
  database: ConfigService.getOrThrow("db_name"),
  logging: false,
});

export async function initializeDatabaseConnection() {
  try {
    sequelize.authenticate().then(() => {
      console.info(
        "Connection to application database successfully initialised"
      );
    });
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export async function closeDatabaseConnection() {
  try {
    // close the database connection
    await sequelize.close();
    console.info("Connection to application database closed");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export default sequelize;
