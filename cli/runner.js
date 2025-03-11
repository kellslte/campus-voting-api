import { seedRolesTable } from "../src/lib/utils.js";

(() => {
  switch (process.argv[2]) {
    case "seed":
      seedRolesTable();
      break;

    default:
      console.log("Invalid command. Please use 'seed' to seed roles table.");
  }
})();
