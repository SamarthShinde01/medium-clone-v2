import { Hono } from "hono";
import blogRouter from "./routes/blogsRoutes";
import { cors } from "hono/cors";
import userRouter from "./routes/userRoutes";
const app = new Hono<{ Bindings: { DATABASE_URL: string } }>();

app.use("/api/*", cors());

app.route("/api/v1/users", userRouter);
app.route("/api/v1/blogs", blogRouter);

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

// 404 Not Found handler
app.notFound((c) => {
	return c.json({ message: "Not Found" }, 404);
});

// Error handling middleware
app.onError((error, c) => {
	console.error(error); // Log the error for debugging
	return c.json({ message: error }, 500);
});

export default app;
