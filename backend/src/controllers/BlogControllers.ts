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
		return c.json({
			message: "Post deleted successfully",
			deleted: deletedPost,
		});
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

//POST /api/v1/blogs/saved  private
const blogSavedController = async (c: any) => {
	try {
		const prisma = new PrismaClient({
			datasourceUrl: c.env.DATABASE_URL,
		}).$extends(withAccelerate());

		const body = await c.req.json();
		console.log(body);
		const saved = await prisma.bookmark.create({
			data: { userId: c.req.user.id, postId: body.blogId },
		});
		console.log(saved);
		c.status(200);
		return c.json(saved);
	} catch (err: any) {
		console.log(err.message);
		c.status(400);
		return c.json({ message: err.message });
	}
};

const blogUnsavedController = async (c: any) => {
	try {
		const prisma = new PrismaClient({
			datasourceUrl: c.env.DATABASE_URL,
		}).$extends(withAccelerate());

		const body = await c.req.json();

		const bookmark = await prisma.bookmark.findFirst({
			where: { postId: body.blogId, userId: c.req.user.id },
		});
		const postId = await prisma.bookmark.deleteMany({
			where: { id: bookmark?.id, userId: c.req.user.id },
		});

		c.status(200);
		return c.json(postId);
	} catch (err: any) {
		console.error(err);
		c.status(400);
		return c.json({ message: err.message });
	}
};

const blogGetSavedPosts = async (c: any) => {
	try {
		const prisma = new PrismaClient({
			datasourceUrl: c.env.DATABASE_URL,
		}).$extends(withAccelerate());

		const blogData = await prisma.user.findUnique({
			where: { id: c.req.user.id },
			select: {
				id: true,
				username: true,
				bookmarks: {
					where: {
						userId: c.req.user.id,
					},
					select: {
						id: true,
						postId: true,
					},
				},
			},
		});

		const postIds = blogData?.bookmarks.map((bookmark) => bookmark.postId);
		const posts = await prisma.post.findMany({
			where: { id: { in: postIds } },
		});
		c.status(200);
		return c.json({ blogData, posts });
	} catch (err: any) {
		console.error(err);
		c.status(400);
		return c.json({ message: err.message });
	}
};

const blogLikePost = async (c: any) => {
	try {
		const prisma = new PrismaClient({
			datasourceUrl: c.env.DATABASE_URL,
		}).$extends(withAccelerate());

		const body = await c.req.json();
		if (!body) {
			c.status(400);
			return c.json({ message: "No inputs found" });
		}

		const [likePost, updatedBlog] = await prisma.$transaction([
			prisma.like.create({
				data: { userId: c.req.user.id, postId: body.blogId },
			}),
			prisma.post.update({
				where: { id: body.blogId },
				data: {
					clap: {
						increment: 1,
					},
				},
			}),
		]);

		c.status(200);
		return c.json({
			likePost,
			updatedBlog: {
				id: updatedBlog.id,
				clap: updatedBlog.clap,
			},
		});
	} catch (err: any) {
		console.error(err);
		c.status(400);
		return c.json({ message: err.message });
	}
};

const blogUnlikePost = async (c: any) => {
	try {
		const prisma = new PrismaClient({
			datasourceUrl: c.env.DATABASE_URL,
		}).$extends(withAccelerate());

		const body = c.req.json();

		if (!body) {
			c.status(400);
			return c.json({ message: "No inputs found" });
		}

		const deleteLike = await prisma.like.findFirst({
			where: { userId: c.req.user.id, postId: body.blogId },
		});

		if (!deleteLike) {
			throw new Error("Like not found");
		}

		const unlikePost = await prisma.like.delete({
			where: { id: deleteLike.id },
		});

		const updatedPost = await prisma.post.update({
			where: { id: unlikePost.postId },
			data: { clap: { decrement: 1 } },
		});

		c.status(200);
		return c.json({
			message: "Post unliked successfully",
			unlikePost,
			updatedPost: {
				id: updatedPost.id,
				clap: updatedPost.clap,
			},
		});
	} catch (err: any) {
		console.error(err);
		c.status(400);
		return c.json({ message: err.message });
	}
};

const blogLikedPosts = async (c: any) => {
	try {
		const prisma = new PrismaClient({
			datasourceUrl: c.env.DATABASE_URL,
		}).$extends(withAccelerate());

		const likedPost = await prisma.like.findMany({
			where: {
				userId: c.req.user.id,
			},
		});

		c.status(200);
		return c.json(likedPost);
	} catch (error: any) {
		console.log(error);
		c.status(400);
		return c.json({ message: error });
	}
};

const blogPostComment = async (c: any) => {
	try {
		const prisma = new PrismaClient({
			datasourceUrl: c.env.DATABASE_URL,
		}).$extends(withAccelerate());

		const body = await c.req.parseBody();
		console.log(body);
		if (!body) {
			throw new Error("Inputs not found");
		}

		const [commentOnPost, updatedPost] = await prisma.$transaction([
			prisma.comment.create({
				data: {
					userId: c.req.user.id,
					postId: body.blogId,
					comment: body.comment,
				},
			}),
			prisma.post.update({
				where: { id: body.blogId },
				data: {
					commentCount: {
						increment: 1,
					},
				},
			}),
		]);

		if (!commentOnPost || !updatedPost) {
			c.status(400);
			return c.json({ message: "Something went wrong" });
		}

		c.status(200);
		return c.json({
			commentOnPost,
			updatedPost: {
				id: updatedPost.id,
				commentCount: updatedPost.commentCount,
			},
		});
	} catch (err: unknown) {
		if (err instanceof Error) {
			console.error(err.message);
		}
	}
};

const blogGetComments = async (c: any) => {
	try {
		const prisma = new PrismaClient({
			datasourceUrl: c.env.DATABASE_URL,
		}).$extends(withAccelerate());

		const body = await c.req.parseBody();
		if (!body) {
			throw new Error("Inputs not found");
		}

		const CommentedPosts = await prisma.post.findMany({
			select: {
				id: true,
				userId: true,
				commentCount: true,
				comments: {
					select: {
						id: true,
						postId: true,
						comment: true,
					},
				},
			},
		});

		c.status(200);
		return c.json(CommentedPosts);
	} catch (err: unknown) {
		if (err instanceof Error) {
			console.error(err.message);
		}
	}
};

export {
	blogsClapController,
	blogsController,
	blogsDeleteController,
	blogsGetController,
	blogsUpdateController,
	blogsUploadController,
	blogsUploaded,
	blogSavedController,
	blogUnsavedController,
	blogGetSavedPosts,
	blogLikePost,
	blogUnlikePost,
	blogLikedPosts,
	blogPostComment,
	blogGetComments,
};
