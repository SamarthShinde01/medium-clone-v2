import { BACKEND_URL } from "@/config";
import { apiSlice } from "./apiSlices";

const BLOGS_URL = `${BACKEND_URL}/api/v1/blogs`;
const storedUserinfo = localStorage.getItem("userInfo") // Corrected key to "userInfo"
	? JSON.parse(localStorage.getItem("userInfo") as string)
	: null;

const token = storedUserinfo ? storedUserinfo.token : null;

const blogsApiSlices = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		publish: builder.mutation({
			query: (data) => ({
				url: BLOGS_URL,
				method: "POST",
				body: data,
				headers: {
					Authorization: token,
				},
			}),
			invalidatesTags: ["Posts"],
		}),
		blogs: builder.mutation({
			query: (data) => ({
				url: BLOGS_URL,
				method: "GET",
				body: data,
				headers: {
					Authorization: token,
				},
			}),
			invalidatesTags: ["Posts"],
		}),
	}),
});

// Export the hook for the publish mutation
export const { usePublishMutation, useBlogsMutation } = blogsApiSlices;