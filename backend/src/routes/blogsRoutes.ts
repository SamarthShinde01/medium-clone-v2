import { Hono } from "hono";
import {
	blogGetSavedPosts,
	blogSavedController,
	blogsClapController,
	blogsCommentController,
	blogsController,
	blogsDeleteController,
	blogsGetController,
	blogsUpdateController,
	blogsUploadController,
	blogsUploaded,
	blogUnsavedController,
} from "../controllers/BlogControllers";
import authMiddleware from "../middleware/authMiddleware";
// import cloudinary from "../utils/cloudinary";
import { v2 as cloudinary } from "cloudinary";

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
	cloudinary.config({
		cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
		api_key: process.env.CLOUDINARY_API_KEY || "",
		api_secret: process.env.CLOUDINARY_API_SECRET || "",
	});

	await next();
});

blogRouter.get("/saved/bulk", authMiddleware, blogGetSavedPosts);
blogRouter.get("/", blogsController);
blogRouter.post("/", authMiddleware, blogsUploadController);
blogRouter.get("/uploaded", authMiddleware, blogsUploaded);
blogRouter.get("/:id", blogsGetController);
blogRouter.put("/:id", authMiddleware, blogsUpdateController);
blogRouter.delete("/:id", authMiddleware, blogsDeleteController);
blogRouter.post("/clap/:id", authMiddleware, blogsClapController);
blogRouter.post("/comment/:id", authMiddleware, blogsCommentController);
blogRouter.post("/saved", authMiddleware, blogSavedController);
blogRouter.post("/unsaved", authMiddleware, blogUnsavedController);

export default blogRouter;
