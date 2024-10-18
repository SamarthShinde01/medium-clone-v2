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
		blogs: builder.query({
			query: () => `${BLOGS_URL}`,
		}),
		blogById: builder.query({
			query: (id) => `${BLOGS_URL}/${id}`,
		}),
		uploaded: builder.query({
			query: () => ({
				url: `${BLOGS_URL}/uploaded`,
				headers: {
					Authorization: token,
				},
			}),
		}),
		update: builder.mutation({
			query: (data) => ({
				url: `${BLOGS_URL}/${data.blog_id}`, // Make sure blog_id is available in data
				method: "PUT",
				body: data,
				headers: {
					Authorization: token,
				},
			}),
			invalidatesTags: ["Posts"],
		}),
		delete: builder.mutation({
			query: (data) => ({
				url: `${BLOGS_URL}/${data.id}`,
				method: "DELETE",
				body: data,
				headers: {
					Authorization: token,
				},
			}),
			invalidatesTags: ["Posts"],
		}),
		saved: builder.mutation({
			query: (data) => ({
				url: `${BLOGS_URL}/saved`,
				method: "POST",
				body: JSON.stringify(data),
				headers: {
					Authorization: token,
				},
			}),
		}),
		unsaved: builder.mutation({
			query: (data) => ({
				url: `${BLOGS_URL}/unsaved`,
				method: "POST",
				body: JSON.stringify(data),
				headers: {
					Authorization: token,
				},
			}),
			invalidatesTags: ["Posts"],
		}),
		savedBulk: builder.query({
			query: () => ({
				url: `${BLOGS_URL}/saved/bulk`,
				headers: {
					Authorization: token,
				},
			}),
		}),
		like: builder.mutation({
			query: (data) => ({
				url: `${BLOGS_URL}/like`,
				method: "POST",
				body: JSON.stringify(data),
				headers: { Authorization: token },
			}),
			invalidatesTags: ["Like"],
		}),
		getLiked: builder.query({
			query: () => ({
				url: `${BLOGS_URL}/liked`,
				headers: { Authorization: token },
			}),
		}),
		unlike: builder.mutation({
			query: (data) => ({
				url: `${BLOGS_URL}/unlike`,
				method: "POST",
				body: JSON.stringify(data),
				headers: { Authorization: token },
			}),
			invalidatesTags: ["Like"],
		}),
	}),
});

// Export the hook for the publish mutation
export const {
	usePublishMutation,
	useBlogsQuery,
	useBlogByIdQuery,
	useUploadedQuery,
	useUpdateMutation,
	useDeleteMutation,
	useSavedMutation,
	useUnsavedMutation,
	useSavedBulkQuery,
	useLikeMutation,
	useUnlikeMutation,
	useGetLikedQuery,
} = blogsApiSlices;
