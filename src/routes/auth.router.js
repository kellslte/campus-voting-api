import { Router } from "express";
import { createUser, getAuthenticatedUser, signIn } from "../auth/auth.controller.js";
import checkAuthenticatedUserOrFail from "../middleware/authentication-check.middleware.js";
const router = Router();

// Create new user
router.post("/sign-up", createUser);

// authenticate user
router.post( "/sign-in", signIn );

// get authenticated user
router.get("/user", checkAuthenticatedUserOrFail, getAuthenticatedUser);

const authRouter = router;
export default authRouter;
