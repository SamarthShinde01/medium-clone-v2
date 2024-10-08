import { apiSlice } from "./apiSlices";

const USER_URL = `${import.meta.env.BACKEND_URL}/api/v1/users`; //getting access to .env variables

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
		getProfile: builder.query({
			// Changed to query
			query: () => ({
				url: `${USER_URL}/profile`,
				method: "GET",
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
	useGetProfileQuery, // Updated to reflect the change
	useUpdateProfileMutation,
} = userApiSlices;
