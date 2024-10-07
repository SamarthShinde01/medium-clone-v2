import { Hono } from "hono";
import {
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

userRouter.use("/profile", authMiddleware);

userRouter.post("/signin", userSignInController);
userRouter.post("/signup", userSignupController);
userRouter.post("/logout", userLogoutController);
userRouter.get("/profile", userGetProfileController);
userRouter.put("/profile", userUpdateProfileController);

export default userRouter;
