/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		id: null,
		token: null,
		firstname: null,
		email: null,
		password: null,
		domainUrl: null,
		canvasToken: null,
	},
	reducers: {
		setCredentials: (state, action) => {
			const { id, token, firstname } = action.payload;
			state.id = id;
			state.token = token;
			state.firstname = firstname;
		},
		logOut: (state) => {
			state.token = null;
		},
		registerCredentials: (state, action) => {
			const {
				email,
				firstname,
				lastname,
				password,
				domainUrl,
				canvasToken,
			} = action.payload;
			state.email = email;
			state.firstname = firstname;
			state.lastname = lastname;
			state.password = password;
			state.domainUrl = domainUrl;
			state.canvasToken = canvasToken;
		},
	},
});

export const { setCredentials, logOut, registerCredentials } =
	authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
