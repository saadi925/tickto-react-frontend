import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { keys } from "../../keys";
import { IUser, LoginData, SignUpData } from "../../types/formTypes";
import {
  setAuthenticated,
  setEmail,
  setFormError,
  setUser,
} from "../slices/authSlice";

const host = keys.host;
interface ErrorResponse {
  message: string;
  code: string;
}
type Token = string;

interface ApiResponse extends ErrorResponse {
  email?: string;
  success?: boolean;
  verified?: boolean;
}
interface ApiTokenResponse extends ErrorResponse {
  token: Token;
}
type VerifyEmail = { code: string; email: string };
interface credentials {
  email: string;
  username: string;
  role: string;
  password: string;
}

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${host}/auth` }),
  endpoints: (builder) => ({
    createUser: builder.mutation<ApiResponse, credentials>({
      query: (newUser: SignUpData) => ({
        url: "/register",
        method: "POST",
        body: newUser,
      }),
      onQueryStarted: async (_newUser, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          if (response.data.email) {
            dispatch(setEmail(response.data.email));
          }
        } catch (error: any) {
          if (error.error.data.message) {
            const { message } = error.error.data;
            dispatch(setFormError(message));
          }
        }
      },
    }),
    loginUser: builder.mutation<ApiTokenResponse, LoginData>({
      query: (credentials: LoginData) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      onQueryStarted: async (_credentials, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          console.log("response : ", response);
          const token = response.data.token;
          if (token !== undefined || token != null) {
            localStorage.setItem("token", token);
          }
          dispatch(setAuthenticated(true));
          dispatch(setFormError(response.data.message));
        } catch (error: any) {
          if (error.error.data.message) {
            const { message } = error.error.data;
            dispatch(setFormError(message));
          }
        }
      },
    }),
    verifyEmail: builder.mutation<ApiTokenResponse, VerifyEmail>({
      query: ({ code, email }: VerifyEmail) => ({
        url: `/email_verify?email=${email}&code=${code}`,
        method: "POST",
      }),
      onQueryStarted: async (_newUser, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          console.log("response : ", response);
          const token = response.data.token;
          if (token !== undefined || token != null) {
            localStorage.setItem("token", token);
          }
          dispatch(setAuthenticated(true));
          dispatch(setFormError(response.data.message));
        } catch (error: any) {
          if (error.error.data.message) {
            const { message } = error.error.data;
            dispatch(setFormError(message));
          }
        }
      },
    }),
    getUser: builder.query<IUser, string>({
      query: (token) => ({
        url: `${host}/user/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      onQueryStarted: async (_newUser, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          dispatch(setUser(response.data.user));
        } catch (error: unknown) {
          console.log(error);
        }
      },
    }),
    resendConfirmation: builder.mutation({
      query: (email: string) => ({
        url: `/email_verify/${email}`,
        method: "POST",
      }),
      onQueryStarted: async (_email, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          dispatch(setFormError(response.data.message));
        } catch (error: any) {
          if (error.error.data.message) {
            dispatch(setFormError(error.error.data.message));
          }
        }
      },
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useVerifyEmailMutation,
  useGetUserQuery,
  useResendConfirmationMutation,
  useLazyGetUserQuery,
} = authApi;
