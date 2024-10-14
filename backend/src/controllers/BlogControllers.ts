import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { blogPostSchema, blogUpdateSchema } from "../config/zodSchema";
import { encodeBase64 } from "hono/utils/encode";
import cloudinary from "../utils/cloudinary";

//GET /api/v1/blogs public
const blogsController = async (c: any) => {
	try {
		const prisma = new PrismaClient({
			datasourceUrl: c.env.DATABASE_URL,
		}).$extends(withAccelerate());

		const blogs = await prisma.post.findMany({});
		c.status(200);
		return c.json(blogs);
	} catch (err: any) {
		c.status(400);
		return c.json({ message: err.message }, 400);
	}
};

//POST /api/v1/blogs/ private
const blogsUploadController = async (c: any) => {
	try {
		const prisma = new PrismaClient({
			datasourceUrl: c.env.DATABASE_URL,
		}).$extends(withAccelerate());

		// Parse request body
		const body = await c.req.parseBody();
		console.log(body);
		const { success } = blogPostSchema.safeParse(body);

		if (!success) {
			c.status(401);
			return c.json({ message: "Invalid data entered" }, 401);
		}

		const image = body["image"] as File;
		console.log(image);

		// // Convert the image to a base64-encoded string
		// const byteArrayBuffer = await image.arrayBuffer();
		// const base64 = Buffer.from(byteArrayBuffer).toString("base64");
		// const dataUrl = `data:${image.type};base64,${base64}`;
		// // Clean the image name to avoid slashes and use a suitable public_id
		// const imageName = image.name.replace(/[\s/]+/g, "_"); // Replace slashes and spaces with underscores

		// // Use fetch to upload the image to Cloudinary
		// const cloudinaryResponse = await fetch(
		// 	"https://api.cloudinary.com/v1_1/dn64adr8h/image/upload",
		// 	{
		// 		method: "POST",
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 		},
		// 		body: JSON.stringify({
		// 			file: dataUrl, // Base64 encoded image
		// 			upload_preset: "my_upload_preset", // Ensure you have a valid preset
		// 			public_id: `medium-clone/${imageName}`, // Specify the asset folder as prefix if needed
		// 		}),
		// 	}
		// );

		// // Parse the Cloudinary response
		// const uploadResult = await cloudinaryResponse.json();
		// if (!cloudinaryResponse.ok) {
		// 	throw new Error(
		// 		uploadResult.error?.message || "Cloudinary upload failed"
		// 	);
		// }

		// console.log(uploadResult);
		// Create the blog post with the uploaded image URL
		const post = await prisma.post.create({
			data: {
				userId: c.req.user.id,
				title: body.title,
				shortContent: body.title,
				content: body.content,
				image: "",
			},
		});
		c.status(200);
		return c.json(post);
	} catch (err: any) {
		console.error("Error:", err.message); // Log the error message
		c.status(400);
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
			c.status(400);
			return c.json({ message: "Blog not found" }, 400);
		}

		c.status(200);
		return c.json(blog);
	} catch (err: any) {
		console.log(err.message);
		c.status(400);
		return c.json({ message: err.message }, 400);
	}
};

//GET  /api/v1/blogs/uploaded
const blogsUploaded = async (c: any) => {
	try {
		const prisma = new PrismaClient({
			datasourceUrl: c.env.DATABASE_URL,
		}).$extends(withAccelerate());

		const uploaded = await prisma.post.findMany({
			where: { userId: c.req.user.id },
		});

		if (!uploaded) {
			throw new Error("Blogs not uploaded yet");
		}

		c.status(200);
		return c.json(uploaded);
	} catch (err: any) {
		console.error(err?.message);
	}
};

//PUT /api/v1/blogs/:id private
const blogsUpdateController = async (c: any) => {
	try {
		const prisma = new PrismaClient({
			datasourceUrl: c.env.DATABASE_URL,
		}).$extends(withAccelerate());

		const body = await c.req.parseBody();

		const { success } = blogUpdateSchema.safeParse(body);
		if (!success) {
			return c.json({ message: "Invalid data entered" });
		}

		const id = await c.req.param("id");

		const blog = await prisma.post.findFirst({ where: { id } });

		if (!blog) {
			c.status(400);
			return c.json({ message: "Post not found" }, 400);
		}

		const updatedPost = {
			title: body.title || blog.title,
			shortContent: body.shortContent || blog.shortContent,
			content: body.content || blog.content,
			image: "",
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
		c.status(200);
		return c.json(updatedBlog);
	} catch (err: any) {
		console.log(err.message);
		c.status(400);
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
		c.status(200);
		return c.json({ message: "Post deleted successfully" });
	} catch (err: any) {
		console.log(err.message);
		c.status(400);
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
		c.status(400);
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
		c.status(200);
		return c.json(comment);
	} catch (err: any) {
		console.log(err.message);
		c.status(400);
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
	blogsUploaded,
};
