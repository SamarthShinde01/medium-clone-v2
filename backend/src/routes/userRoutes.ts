import { Hono } from "hono";
import {
	userGetProfileController,
	userLogoutController,
	userSignInController,
	userSignupController,
	userUpdateProfileController,
} from "../controllers/userControllers";

const router = new Hono();

router.post("/signin", userSignInController);
router.post("/signup", userSignupController);
router.post("/logout", userLogoutController);
router.get("/profile", userGetProfileController);
router.put("/profile", userUpdateProfileController);

export default router;
