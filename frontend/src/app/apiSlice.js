/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_URL;

export const apiSlice = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: baseUrl,
		credentials: "include",
		prepareHeaders: (headers, { getState }) => {
			const token = getState().auth.token;
			if (token) {
				headers.set("Authorization", token);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({}),
});
