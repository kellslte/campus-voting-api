import { seedAdminsTable, seedRolesTable } from "../src/lib/utils.js";

(() => {
  switch (process.argv[2]) {
    case "seed:roles":
      seedRolesTable();
      break;
    
    case "seed:admins":
      seedAdminsTable();
      break;

    default:
      console.log("Invalid command. Please use 'seed' to seed roles table.");
  }
})();
