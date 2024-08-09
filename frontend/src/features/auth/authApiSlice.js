/* eslint-disable no-unused-vars */
import { apiSlice } from "../../app/apiSlice";
import { setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data) => ({
				url: "/auth/login",
				method: "POST",
				body: { ...data },
			}),
		}),
		signup: builder.mutation({
			query: (data) => ({
				url: "/auth/signup",
				method: "POST",
				body: { ...data },
				responseHandler: (response) => response.text(),
			}),
		}),
		refresh: builder.mutation({
			query: () => ({
				url: "/auth/refresh",
				method: "POST",
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					const { id, firstname, token } = data;
					dispatch(setCredentials({ id: id, firstname: firstname, token: token }));
				} catch (err) {
					console.log(err);
				}
			},
		}),
	}),
});

export const { useLoginMutation, useSignupMutation, useRefreshMutation } = authApiSlice;