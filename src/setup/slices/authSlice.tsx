import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../query/apiSlice";
import { IUser } from "../../types/formTypes";

export interface AuthState {
  loading: boolean;
  message: string | null;
  user: IUser | null;
  email: string | null;
  authenticated: boolean;
}
const initialState: AuthState = {
  loading: false,
  message: null,
  user: null,
  email: null,
  authenticated: false,
};

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.authenticated = action.payload;
    },
    setFormError: (state, action) => {
      state.message = action.payload;
    },
    clearErrors: (state) => {
      state.message = null;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.createUser.matchFulfilled,
      (state, action) => {
        state.message = action.payload.message;
      }
    );
  },
});
export const {
  setAuthenticated,
  setFormError,
  clearErrors,
  setEmail,
  setUser,
} = authSlice.actions;
export default authSlice.reducer;
