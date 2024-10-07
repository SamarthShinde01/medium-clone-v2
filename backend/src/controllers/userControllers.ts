import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {
	updateUserSchema,
	userSigninSchema,
	userSignupSchema,
} from "../config/zodSchema";
import bcrypt from "bcryptjs";
import generateToken from "../../utils/generateToken";
import { deleteCookie } from "hono/cookie";

//POST /api/v1/users/signin public
const userSignInController = async (c: any) => {
	try {
		const prisma = new PrismaClient({
			datasourceUrl: c.env.DATABASE_URL,
		}).$extends(withAccelerate());

		const body = await c.req.json();
		const { success } = userSigninSchema.safeParse(body);

		if (!success) {
			return c.json({ message: "Please enter valid data" }, 400);
		}

		const userExist = await prisma.user.findFirst({
			where: { username: body.username },
		});

		if (!userExist) {
			return c.json({ message: "User does not exist" }, 400);
		}

		const comparePassword = await bcrypt.compare(
			body.password,
			userExist.password
		);

		if (!comparePassword) {
			return c.json({ message: "Invalid password entered" }, 400);
		} else {
			generateToken(c, userExist.id);
			return c.json({
				user: { name: userExist.name, username: userExist.username },
			});
		}
	} catch (err: any) {
		return c.json({ message: err.message }, 400);
	}
};

//POST /api/v1/users/signup public
const userSignupController = async (c: any) => {
	try {
		const prisma = new PrismaClient({
			datasourceUrl: c.env.DATABASE_URL,
		}).$extends(withAccelerate());

		const body = await c.req.json();
		const { success } = userSignupSchema.safeParse(body);
		if (!success) {
			return c.json({ message: "Please enter valid data" }, 400);
		}

		const userExist = await prisma.user.findFirst({
			where: { username: body.username },
		});

		if (userExist) {
			return c.json({ message: "User already exist" }, 400);
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
		return c.json({ user }, 200);
	} catch (err: any) {
		return c.json({ message: err.message }, 400);
	}
};

//POST /api/v1/users/logout public
const userLogoutController = (c: any) => {
	try {
		deleteCookie(c, "jwt");
		return c.json({ message: "Logged out successfully" }, 200);
	} catch (err: any) {
		console.error(err);
		return c.json({ message: err.message }, 400);
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
		};
		return c.json(user, 200);
	} catch (err: any) {
		console.log(err.message);
		return c.json({ message: err.message }, 400);
	}
};

//PUT /api/v1/users/profile private
const userUpdateProfileController = async (c: any) => {
	try {
		const prisma = new PrismaClient({
			datasourceUrl: c.env.DATABASE_URL,
		}).$extends(withAccelerate());

		const body = await c.req.json();

		const { success } = updateUserSchema.safeParse(body);
		if (!success) {
			return c.json({ message: "Invalid data entered" });
		}

		let updatedUser: UpdatedUser = {
			name: body.name || c.req.user.name,
			username: body.username || c.req.user.username,
			image: body.image || c.req.user.image,
			password: c.req.user.password,
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
			},
		});

		return c.json({ user }, 200);
	} catch (err: any) {
		console.log(err.message);
		return c.json({ message: err.message }, 400);
	}
};

interface UpdatedUser {
	name: string;
	username: string;
	image: string;
	password: string;
}

export {
	userGetProfileController,
	userSignInController,
	userUpdateProfileController,
	userLogoutController,
	userSignupController,
};
