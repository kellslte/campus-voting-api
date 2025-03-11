import { Router } from "express";
import { registerCandidate } from "../candidate/candidate.controller.js";
import checkAuthenticatedUserOrFail from "../middleware/authentication-check.middleware.js";
import authorizeUserAction from "../middleware/authorize.middleware.js";
import FileProviderService from "../common/providers/file.provider.js";
const router = Router();

// Register new candidate
router.post(
  "/register",
  checkAuthenticatedUserOrFail,
  authorizeUserAction("Admin"),
  FileProviderService.uploadFile("photo"),
  registerCandidate
);

const candidateRouter = router;
export default candidateRouter;
