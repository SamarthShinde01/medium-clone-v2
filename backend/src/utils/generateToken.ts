import { setCookie } from "hono/cookie";
import jwt from "jsonwebtoken";

const generateToken = (c: any, userId: string) => {
	const token = jwt.sign({ userId }, c.env.JWT_SECRET, { expiresIn: "1d" });

	// Use `c.cookie()` instead of `c.res.cookie()`
	setCookie(c, "jwt", token, {
		httpOnly: true,
		sameSite: "strict", // Set to strict for better security
		maxAge: 1 * 24 * 60 * 60, // 1 day
		secure: c.env.NODE_ENV === "production", // Only set secure flag in production
	});
};

export default generateToken;
