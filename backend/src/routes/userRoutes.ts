import { Hono } from "hono";
import {
	userGetProfileController,
	userLogoutController,
	userSignInController,
	userSignupController,
	userUpdateProfileController,
} from "../controllers/userControllers";

const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
	};
}>();

userRouter.post("/signin", userSignInController);
userRouter.post("/signup", userSignupController);
userRouter.post("/logout", userLogoutController);
userRouter.get("/profile", userGetProfileController);
userRouter.put("/profile", userUpdateProfileController);

export default userRouter;
