import { Router } from "express";
import { createUser, getAuthenticatedUser, logout, signIn } from "../auth/auth.controller.js";
import checkAuthenticatedUserOrFail from "../middleware/authentication-check.middleware.js";
const router = Router();

// Create new user
router.post("/sign-up", createUser);

// authenticate user
router.post( "/sign-in", signIn );

// get authenticated user
router.get( "/user", checkAuthenticatedUserOrFail, getAuthenticatedUser );

// Sign out a user
router.post("/sign-out", checkAuthenticatedUserOrFail, logout);

const authRouter = router;
export default authRouter;
