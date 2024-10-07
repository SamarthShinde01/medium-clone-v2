import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { blogPostSchema, blogUpdateSchema } from "../config/zodSchema";

//GET /api/v1/blogs public
const blogsController = async (c: any) => {
	try {
		const prisma = new PrismaClient({
			datasourceUrl: c.env.DATABASE_URL,
		}).$extends(withAccelerate());

		const blogs = await prisma.post.findMany({});

		return c.json(blogs, 200);
	} catch (err: any) {
		return c.json({ message: err.message }, 400);
	}
};

//POST /api/v1/blogs/ private
const blogsUploadController = async (c: any) => {
	try {
		const prisma = new PrismaClient({
			datasourceUrl: c.env.DATABASE_URL,
		}).$extends(withAccelerate());

		const body = await c.req.json();
		const { success } = blogPostSchema.safeParse(body);

		if (!success) {
			return c.json({ message: "Invalid data entered" }, 401);
		}

		const post = await prisma.post.create({
			data: {
				userId: c.req.user.id,
				title: body.title,
				shortContent: body.title,
				content: body.content,
				image: body.image,
			},
		});

		return c.json(post, 200);
	} catch (err: any) {
		console.log(err.message);
		return c.json({ message: err.message }, 400);
	}
};

//GET /api/v1/blogs/:id  public
const blogsGetController = async (c: any) => {
	try {
		const prisma = new PrismaClient({
			datasourceUrl: c.env.DATABASE_URL,
		}).$extends(withAccelerate());

		const id = await c.req.param("id");

		const blog = await prisma.post.findFirst({ where: { id } });

		if (!blog) {
			return c.json({ message: "Blog not found" }, 400);
		}

		return c.json(blog, 200);
	} catch (err: any) {
		console.log(err.message);
		return c.json({ message: err.message }, 400);
	}
};

//PUT /api/v1/blogs/:id private
const blogsUpdateController = async (c: any) => {
	try {
		const prisma = new PrismaClient({
			datasourceUrl: c.env.DATABASE_URL,
		}).$extends(withAccelerate());

		const body = await c.req.json();

		const { success } = blogUpdateSchema.safeParse(body);
		if (!success) {
			return c.json({ message: "Invalid data entered" });
		}

		const id = await c.req.param("id");

		const blog = await prisma.post.findFirst({ where: { id } });

		if (!blog) {
			return c.json({ message: "Post not found" }, 400);
		}

		const updatedPost = {
			title: body.title || blog.title,
			shortContent: body.shortContent || blog.shortContent,
			content: body.content || blog.content,
			image: body.image || blog.image,
		};

		const updatedBlog = await prisma.post.update({
			where: { id },
			data: {
				title: updatedPost.title,
				shortContent: updatedPost.shortContent,
				content: updatedPost.content,
				image: updatedPost.image,
			},
		});

		return c.json(updatedBlog, 200);
	} catch (err: any) {
		console.log(err.message);
		return c.json({ message: err.message }, 400);
	}
};

//DELETE /api/v1/blogs/:id private
const blogsDeleteController = async (c: any) => {
	try {
		const prisma = new PrismaClient({
			datasourceUrl: c.env.DATABASE_URL,
		}).$extends(withAccelerate());

		const id = await c.req.param("id");
		const deletedPost = await prisma.post.delete({ where: { id: id } });

		return c.json({ message: "Post deleted successfully" }, 200);
	} catch (err: any) {
		console.log(err.message);
		return c.json({ message: err.message }, 400);
	}
};

//POST /api/v1/blogs/clap/:id private
const blogsClapController = async (c: any) => {
	try {
		const prisma = new PrismaClient({
			datasourceUrl: c.env.DATABASE_URL,
		}).$extends(withAccelerate());

		const id = await c.req.param("id");

		const clappedPost = await prisma.post.update({
			where: { id },
			data: {
				clap: {
					increment: 1,
				},
			},
		});

		if (!clappedPost) {
			return c.json({ message: "Something went wrong with the post" });
		}

		return c.json({ message: "Clap updated on post" });
	} catch (err: any) {
		console.log(err.message);
		return c.json({ message: err.message }, 400);
	}
};

//POST /api/v1/blogs/comment/:id  private
const blogsCommentController = async (c: any) => {
	try {
		const prisma = new PrismaClient({
			datasourceUrl: c.env.DATABASE_URL,
		}).$extends(withAccelerate());

		const body = await c.req.json();
		const id = await c.req.param("id");

		const comment = await prisma.comment.create({
			data: { userId: c.req.user.id, postId: id, comment: body.comment },
		});

		return c.json(comment, 200);
	} catch (err: any) {
		console.log(err.message);
		return c.json({ message: err.message }, 400);
	}
};

export {
	blogsClapController,
	blogsCommentController,
	blogsController,
	blogsDeleteController,
	blogsGetController,
	blogsUpdateController,
	blogsUploadController,
};
