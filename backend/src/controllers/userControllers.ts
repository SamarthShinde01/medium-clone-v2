import { Context } from "hono";

//POST /api/v1/users/signin public
const userSignInController = (c: Context) => {
	try {
		return c.json({ messge: "sign in route" }, 200);
	} catch (err: any) {
		console.error(err);
		throw new Error(err.message);
	}
};

//POST /api/v1/users/signup public
const userSignupController = (c: Context) => {
	try {
		return c.json({ message: "sign up route" }, 200);
	} catch (err: any) {
		console.error(err);
		throw new Error(err.message);
	}
};

//POST /api/v1/users/logout public
const userLogoutController = (c: Context) => {
	try {
		return c.json({ message: "logout route" }, 200);
	} catch (err: any) {
		console.error(err);
		throw new Error(err.message);
	}
};

//GET /api/v1/users/profile private
const userGetProfileController = (c: Context) => {
	try {
		return c.json({ message: "get profile" }, 200);
	} catch (err: any) {
		console.log(err.message);
		throw new Error(err.message);
	}
};

//PUT /api/v1/users/profile private
const userUpdateProfileController = (c: Context) => {
	try {
		return c.json({ message: "updates profile" }, 200);
	} catch (err: any) {
		console.log(err.message);
		throw new Error(err.message);
	}
};

export {
	userGetProfileController,
	userSignInController,
	userUpdateProfileController,
	userLogoutController,
	userSignupController,
};
