import { BACKEND_URL } from "@/config";
import { apiSlice } from "./apiSlices";

const USER_URL = `${BACKEND_URL}/api/v1/users`;

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
			}),
		}),
		profile: builder.mutation({
			// Changed to query
			query: (data) => ({
				url: `${USER_URL}/profile`,
				method: "GET",
				body: data,
			}),
		}),
		updateProfile: builder.mutation({
			query: (data) => ({
				url: `${USER_URL}/profile`,
				method: "PUT",
				body: data,
			}),
		}),
	}),
});

export const {
	useSigninMutation,
	useLogoutMutation,
	useSignupMutation,
	useProfileMutation, // Updated to reflect the change
	useUpdateProfileMutation,
} = userApiSlices;
