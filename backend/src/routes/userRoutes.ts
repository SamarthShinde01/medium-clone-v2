import { Hono } from "hono";
import {
	getUserProfile,
	userGetProfileController,
	userLogoutController,
	userSignInController,
	userSignupController,
	userUpdateProfileController,
} from "../controllers/userControllers";
import authMiddleware from "../middleware/authMiddleware";

const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
}>();

userRouter.post("/signin", userSignInController);
userRouter.post("/signup", userSignupController);
userRouter.post("/logout", userLogoutController);
userRouter.get("/profile", authMiddleware, userGetProfileController);
userRouter.put("/profile", authMiddleware, userUpdateProfileController);
userRouter.get("/profile/:id", getUserProfile);

export default userRouter;
