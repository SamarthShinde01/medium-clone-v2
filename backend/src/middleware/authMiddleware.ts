import { Next } from "hono";
import { getCookie } from "hono/cookie";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const authMiddleware = async (c: any, next: Next) => {
	try {
		let token = getCookie(c, "jwt");
		if (token) {
			const prisma = new PrismaClient({
				datasourceUrl: c.env.DATABASE_URL,
			}).$extends(withAccelerate());

			const decoded = jwt.verify(token, c.env.JWT_SECRET) as { userId: string };

			const user = await prisma.user.findFirst({
				where: { id: decoded.userId },
			});

			c.req.user = user;

			await next();
		} else {
			return c.json({ message: "Not authorized, No token" }, 401);
		}
	} catch (err: any) {
		return c.json({ message: err.message });
	}
};

export default authMiddleware;
