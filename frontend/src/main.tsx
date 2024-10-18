import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import "react-toastify/ReactToastify.css";
import { Provider } from "react-redux";
import { Blogs } from "./pages/Blogs.tsx";
import { Signup } from "./pages/Signup.tsx";
import { Signin } from "./pages/Signin.tsx";
import { Blog } from "./pages/Blog.tsx";
import { Publish } from "./pages/Publish.tsx";
import { Uploaded } from "./pages/Uploaded.tsx";
import { Saved } from "./pages/Saved.tsx";
import { Profile } from "./pages/Profile.tsx";
import { Comments } from "./pages/Comments.tsx";
import { EditBlog } from "./pages/EditBlogPage.tsx";
import store from "./store.ts";
import { NotFound } from "./pages/NotFound.tsx";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="" element={<App />}>
			<Route path="/" element={<Blogs />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/signin" element={<Signin />} />
			<Route path="/settings" element={<Profile />} />
			<Route path="/blog/:id" element={<Blog />} />
			<Route path="/blog/edit/:id" element={<EditBlog />} />
			<Route path="/blogs" element={<Blogs />} />
			<Route path="/publish" element={<Publish />} />
			<Route path="/blogs/uploaded" element={<Uploaded />} />
			<Route path="/blogs/saved" element={<Saved />} />
			<Route path="/blogs/comments" element={<Comments />} />

			<Route path="*" element={<NotFound />} />
		</Route>
	)
);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
);
