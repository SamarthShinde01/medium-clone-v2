import { Hono } from "hono";
import {
	blogsClapController,
	blogsCommentController,
	blogsController,
	blogsDeleteController,
	blogsGetController,
	blogsUpdateController,
	blogsUploadController,
} from "../controllers/BlogControllers";
import authMiddleware from "../middleware/authMiddleware";
import cloudinary from "../utils/cloudinary";

const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
		CLOUDINARY_CLOUD_NAME: string;
		CLOUDINARY_API_KEY: string;
		CLOUDINARY_API_SECRET: string;
	};
}>();

blogRouter.use(async (c, next) => {
	cloudinary;
	await next();
});

blogRouter.get("/", blogsController);
blogRouter.post("/", authMiddleware, blogsUploadController);

blogRouter.get("/:id", blogsGetController);
blogRouter.put("/:id", authMiddleware, blogsUpdateController);
blogRouter.delete("/:id", authMiddleware, blogsDeleteController);
blogRouter.post("/clap/:id", authMiddleware, blogsClapController);
blogRouter.post("/comment/:id", authMiddleware, blogsCommentController);

export default blogRouter;
