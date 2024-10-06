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

const router = new Hono();

router.get("/", blogsController);
router.post("/", blogsUploadController);
router.get("/:id", blogsGetController);
router.put("/:id", blogsUpdateController);
router.delete("/:id", blogsDeleteController);
router.post("/clap/:id", blogsClapController);
router.post("/comment/:id", blogsCommentController);

export default router;
