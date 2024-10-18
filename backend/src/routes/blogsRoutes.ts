import { Hono } from "hono";
import {
	blogGetComments,
	blogGetSavedPosts,
	blogLikedPosts,
	blogLikePost,
	blogPostComment,
	blogSavedController,
	blogsClapController,
	blogsController,
	blogsDeleteController,
	blogsGetController,
	blogsUpdateController,
	blogsUploadController,
	blogsUploaded,
	blogUnlikePost,
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

blogRouter.get("/comment", blogGetComments);
blogRouter.get("/liked", blogLikedPosts);
blogRouter.get("/saved/bulk", authMiddleware, blogGetSavedPosts);
blogRouter.post("/", authMiddleware, blogsUploadController);
blogRouter.get("/uploaded", authMiddleware, blogsUploaded);
blogRouter.get("/:id", blogsGetController);
blogRouter.put("/:id", authMiddleware, blogsUpdateController);
blogRouter.delete("/:id", authMiddleware, blogsDeleteController);
blogRouter.post("/clap/:id", authMiddleware, blogsClapController);
blogRouter.post("/saved", authMiddleware, blogSavedController);
blogRouter.post("/unsaved", authMiddleware, blogUnsavedController);
blogRouter.post("/like", authMiddleware, blogLikePost);
blogRouter.post("/unlike", authMiddleware, blogUnlikePost);
blogRouter.post("/comment", authMiddleware, blogPostComment);

blogRouter.get("/", blogsController);
export default blogRouter;
