import ConfigService from "./common/classes/config-service.class.js";
import { server } from "./www/server.js";
import { initializeDatabaseConnection } from "./common/providers/database.provider.js";
import setupAssociations from "./models/associations.js";

(async () => {
  try {
    const port = parseInt(ConfigService.getOrThrow("port"));
    await initializeDatabaseConnection();
    setupAssociations();
    server.listen(port, () => {
      console.info(`The server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
