import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { userSigninSchema, userSignupSchema } from "../../config/zodSchema";
import bcrypt from "bcryptjs";

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

		return c.json({ user }, 200);
	} catch (err: any) {
		return c.json({ message: err.message }, 400);
	}
};

//POST /api/v1/users/logout public
const userLogoutController = (c: any) => {
	try {
		return c.json({ message: "logout route" }, 200);
	} catch (err: any) {
		console.error(err);
		return c.json({ message: err.message }, 400);
	}
};

//GET /api/v1/users/profile private
const userGetProfileController = (c: any) => {
	try {
		return c.json({ message: "get profile" }, 200);
	} catch (err: any) {
		console.log(err.message);
		return c.json({ message: err.message }, 400);
	}
};

//PUT /api/v1/users/profile private
const userUpdateProfileController = (c: any) => {
	try {
		return c.json({ message: "updates profile" }, 200);
	} catch (err: any) {
		console.log(err.message);
		return c.json({ message: err.message }, 400);
	}
};

export {
	userGetProfileController,
	userSignInController,
	userUpdateProfileController,
	userLogoutController,
	userSignupController,
};
