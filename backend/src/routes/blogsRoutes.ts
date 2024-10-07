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

const blogRouter = new Hono<{
	Bindings: { DATABASE_URL: string; JWT_SECRET: string };
}>();

blogRouter.get("/", blogsController);
blogRouter.post("/", authMiddleware, blogsUploadController);
blogRouter.get("/:id", blogsGetController);
blogRouter.put("/:id", authMiddleware, blogsUpdateController);
blogRouter.delete("/:id", authMiddleware, blogsDeleteController);
blogRouter.post("/clap/:id", authMiddleware, blogsClapController);
blogRouter.post("/comment/:id", authMiddleware, blogsCommentController);

export default blogRouter;
