import * as z from "zod";

export const userSignupSchema = z.object({
	name: z.string().min(1, { message: "Please enter valid name" }),
	username: z
		.string()
		.email()
		.min(1, { message: "Please enter valid username" }),
	password: z.string().min(1, { message: "Please enter valid password" }),
});

export const userSigninSchema = z.object({
	username: z
		.string()
		.email()
		.min(1, { message: "Please enter valid username" }),
	password: z.string().min(1, { message: "Please enter valid password" }),
});

export const updateUserSchema = z.object({
	name: z.string().min(1, { message: "Enter valid name" }).optional(),
	username: z
		.string()
		.email()
		.min(1, { message: "Enter valid username" })
		.optional(),
	image: z.string().min(1, { message: "Enter valid username" }).optional(),
	password: z.string().min(1, { message: "Enter valid username" }).optional(),
});

export const blogPostSchema = z.object({
	title: z.string().min(1, { message: "Enter valid title" }).optional(),
	shortContent: z
		.string()
		.min(1, { message: "Enter valid shortContent" })
		.optional(),
	content: z.string().min(1, { message: "Enter valid content" }).optional(),
});

export const blogUpdateSchema = z.object({
	title: z.string().min(1, { message: "Enter valid title" }).optional(),
	shortContent: z
		.string()
		.min(1, { message: "Enter valid shortContent" })
		.optional(),
	content: z.string().min(1, { message: "Enter valid content" }).optional(),
});
