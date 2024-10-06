//GET /api/v1/blogs public
const blogsController = async (c: any) => {
	try {
		return c.json({ message: "blogs controller" }, 200);
	} catch (err: any) {
		console.log(err.message);
		return c.json({ message: err.message }, 400);
	}
};

//POST /api/v1/blogs/ private
const blogsUploadController = async (c: any) => {
	try {
		return c.json({ message: "blogs controller" }, 200);
	} catch (err: any) {
		console.log(err.message);
		return c.json({ message: err.message }, 400);
	}
};

//GET /api/v1/blogs/:id  public
const blogsGetController = async (c: any) => {
	try {
		return c.json({ message: "blogs controller" }, 200);
	} catch (err: any) {
		console.log(err.message);
		return c.json({ message: err.message }, 400);
	}
};

//PUT /api/v1/blogs/:id private
const blogsUpdateController = async (c: any) => {
	try {
		return c.json({ message: "blogs controller" }, 200);
	} catch (err: any) {
		console.log(err.message);
		return c.json({ message: err.message }, 400);
	}
};

//DELETE /api/v1/blogs/:id private
const blogsDeleteController = async (c: any) => {
	try {
		return c.json({ message: "blogs controller" }, 200);
	} catch (err: any) {
		console.log(err.message);
		return c.json({ message: err.message }, 400);
	}
};

//POST /api/v1/blogs/comment/:id  private
const blogsCommentController = async (c: any) => {
	try {
		return c.json({ message: "blogs controller" }, 200);
	} catch (err: any) {
		console.log(err.message);
		return c.json({ message: err.message }, 400);
	}
};

//POST /api/v1/blogs/clap/:id private
const blogsClapController = async (c: any) => {
	try {
		return c.json({ message: "blogs controller" }, 200);
	} catch (err: any) {
		console.log(err.message);
		return c.json({ message: err.message }, 400);
	}
};

export {
	blogsClapController,
	blogsCommentController,
	blogsController,
	blogsDeleteController,
	blogsGetController,
	blogsUpdateController,
	blogsUploadController,
};
