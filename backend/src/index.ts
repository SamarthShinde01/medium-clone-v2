import { Hono } from "hono";
import userRouter from "./routes/userRoutes";
import blogRouter from "./routes/blogsRoutes";

const app = new Hono();

app.route("/api/v1/users", userRouter);
app.route("/api/v1/blogs", blogRouter);

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

app.notFound((c) => {
	return c.json({ message: "Not Found" }, 404);
});

export default app;
