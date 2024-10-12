import { BACKEND_URL } from "@/config";
import { apiSlice } from "./apiSlices";

const USER_URL = `${BACKEND_URL}/api/v1/users`;

const storedUserinfo = localStorage.getItem("userInfo") // Corrected key to "userInfo"
	? JSON.parse(localStorage.getItem("userInfo") as string)
	: null;

const token = storedUserinfo ? storedUserinfo.token : null;

const userApiSlices = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		signin: builder.mutation({
			query: (data) => ({
				url: `${USER_URL}/signin`,
				method: "POST",
				body: data,
			}),
		}),
		signup: builder.mutation({
			query: (data) => ({
				url: `${USER_URL}/signup`,
				method: "POST",
				body: data,
			}),
		}),
		logout: builder.mutation({
			query: (data) => ({
				url: `${USER_URL}/logout`,
				method: "POST",
				body: data,
				headers: {
					Authorization: token,
				},
			}),
		}),
		profile: builder.query({
			// Changed to query
			query: () => ({
				url: `${USER_URL}/profile`,
				headers: {
					Authorization: token,
				},
			}),
		}),
		updateProfile: builder.mutation({
			query: (data) => ({
				url: `${USER_URL}/profile`,
				method: "PUT",
				body: data,
				headers: {
					Authorization: token,
				},
			}),
			invalidatesTags: ["User"],
		}),
		userById: builder.query({
			query: (id) => `${USER_URL}/profile/${id}`,
		}),
	}),
});

export const {
	useSigninMutation,
	useLogoutMutation,
	useSignupMutation,
	useProfileQuery,
	useUpdateProfileMutation,
	useUserByIdQuery,
} = userApiSlices;
