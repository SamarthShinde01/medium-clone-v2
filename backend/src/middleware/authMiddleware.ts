import jwt from "jsonwebtoken";

export const authMiddlware = async (c: any) => {
	const token = c.req.cookie("jwt");

	if (token) {
		try {
			const decoded = jwt.verify();
		} catch (err: any) {
			console.log(err.message);
			throw new Error(err.message);
		}
	} else {
		return c.json({ message: "not authorized, no token" }, 400);
	}
};
