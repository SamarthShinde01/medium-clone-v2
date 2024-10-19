import { setCookie } from "hono/cookie";
import jwt from "jsonwebtoken";

const generateToken = (c: any, userId: string) => {
	const token = jwt.sign({ userId }, c.env.JWT_SECRET, { expiresIn: "1d" });

	setCookie(c, "jwt", token, {
		httpOnly: true,
		sameSite: "strict",
		maxAge: 3 * 24 * 60 * 60,
		secure: c.env.NODE_ENV === "production",
	});
};

export default generateToken;
