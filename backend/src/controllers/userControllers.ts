import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {
	updateUserSchema,
	userSigninSchema,
	userSignupSchema,
} from "../config/zodSchema";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken";
import { deleteCookie } from "hono/cookie";
import jwt from "jsonwebtoken";

//POST /api/v1/users/signin public
const userSignInController = async (c: any) => {
	try {
		const prisma = new PrismaClient({
			datasourceUrl: c.env.DATABASE_URL,
		}).$extends(withAccelerate());

		const body = await c.req.json();
		const { success } = userSigninSchema.safeParse(body);

		if (!success) {
			c.status(400);
			return c.json({ message: "Please enter valid data" });
		}

		const userExist = await prisma.user.findFirst({
			where: { username: body.username },
		});

		if (!userExist) {
			c.status(400);
			return c.json({ message: "User does not exist" });
		}

		const comparePassword = await bcrypt.compare(
			body.password,
			userExist.password
		);

		if (!comparePassword) {
			c.status(400);
			return c.json({ message: "Invalid password entered" });
		} else {
			generateToken(c, userExist.id);
			const token = jwt.sign({ userId: userExist.id }, c.env.JWT_SECRET);
			c.status(200);
			return c.json({
				user: {
					id: userExist.id,
					name: userExist.name,
					username: userExist.username,
				},
				token,
			});
		}
	} catch (err: any) {
		c.status(400);
		return c.json({ message: err.message });
	}
};

//POST /api/v1/users/signup public
const userSignupController = async (c: any) => {
	const body = await c.req.json();

	const { success } = userSignupSchema.safeParse(body);

	try {
		const prisma = new PrismaClient({
			datasourceUrl: c.env.DATABASE_URL,
		}).$extends(withAccelerate());

		if (!success) {
			c.status(400);
			return c.json({ message: "Please enter valid data" });
		}

		const userExist = await prisma.user.findFirst({
			where: { username: body.username },
		});

		if (userExist) {
			c.status(400);
			return c.json({ message: "User already exist" });
		}

		const hashedPassword = await bcrypt.hash(body.password, 10);
		const user = await prisma.user.create({
			data: {
				name: body.name,
				username: body.username,
				password: hashedPassword,
			},
		});

		generateToken(c, user.id);

		const token = jwt.sign({ userId: user.id }, c.env.JWT_SECRET);
		c.status(200);
		return c.json({ user, token });
	} catch (err: any) {
		c.status(400);
		return c.json({ message: err.message });
	}
};

//POST /api/v1/users/logout public
const userLogoutController = (c: any) => {
	try {
		deleteCookie(c, "jwt");
		c.status(200);
		return c.json({ message: "Logged out successfully" });
	} catch (err: any) {
		console.error(err);
		c.status(400);
		return c.json({ message: err.message });
	}
};

//GET /api/v1/users/profile private
const userGetProfileController = (c: any) => {
	try {
		const user = {
			id: c.req.user.id,
			name: c.req.user.name,
			username: c.req.user.username,
			image: c.req.user.image,
			bio: c.req.user.bio,
		};
		c.status(200);
		return c.json(user);
	} catch (err: any) {
		console.log(err.message);
		c.status(400);
		return c.json({ message: err.message });
	}
};

//PUT /api/v1/users/profile private
const userUpdateProfileController = async (c: any) => {
	try {
		const prisma = new PrismaClient({
			datasourceUrl: c.env.DATABASE_URL,
		}).$extends(withAccelerate());

		// const body = await c.req.json();
		const body = await c.req.parseBody();

		const { success } = updateUserSchema.safeParse(body);
		if (!success) {
			return c.json({ message: "Invalid data entered" });
		}

		let updatedUser: UpdatedUser = {
			name: body.name || c.req.user.name,
			username: body.username || c.req.user.username,
			image: body.image || c.req.user.image,
			password: c.req.user.password,
			bio: body.bio || c.req.user.bio,
		};

		if (body.password) {
			updatedUser.password = await bcrypt.hash(body.password, 10);
		}

		const user = await prisma.user.update({
			where: { id: c.req.user.id },
			data: {
				name: updatedUser.name,
				username: updatedUser.username,
				password: updatedUser.password,
				image: updatedUser.image,
				bio: updatedUser.bio,
			},
		});
		c.status(200);
		return c.json({ user });
	} catch (err: any) {
		console.log(err.message);
		c.status(400);
		return c.json({ message: err.message });
	}
};

interface UpdatedUser {
	name: string;
	username: string;
	image: string;
	password: string;
	bio: string;
}

export {
	userGetProfileController,
	userSignInController,
	userUpdateProfileController,
	userLogoutController,
	userSignupController,
};
