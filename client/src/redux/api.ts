import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { RegisterFormData } from '../pages/auth/Registration';
import { HttpResponse } from '../utils/commonTypes';
import { hotel, user } from '../utils/tags';
import { UserState } from './slice/user_slice';
import { SignInFormData } from '../pages/auth/Login';

export interface CustomError {
  status: number;
  data: {
    success: boolean;
    message: string;
    type: string;
    status: number;
  };
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/v1`,
    credentials: 'include',
    prepareHeaders: async (headers) => {
      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,

  reducerPath: 'api',

  endpoints: (builder) => ({
    registration: builder.mutation<
      HttpResponse<UserState['user']>,
      RegisterFormData
    >({
      query: (body) => ({
        url: `/auth/sign-up`,
        method: 'POST',
        body: body,
      }),
    }),

    login: builder.mutation<HttpResponse<UserState['user']>, SignInFormData>({
      query: (body) => ({
        url: `/auth/login`,
        method: 'POST',
        body: body,
      }),
    }),

    forgotPassword: builder.mutation<HttpResponse<void>, { email: string }>({
      query: () => ({
        url: `/auth/forgot-password`,
        method: 'POST',
      }),
    }),

    verifyOTP: builder.mutation<
      HttpResponse<{ token: string }>,
      { email: string; otp: string | number }
    >({
      query: () => ({
        url: `/auth/verify-otp`,
        method: 'POST',
      }),
    }),

    resetPassword: builder.mutation<
      HttpResponse<void>,
      { token: string; password: string }
    >({
      query: () => ({
        url: `/auth/reset-password`,
        method: 'POST',
      }),
    }),

    signOut: builder.query<HttpResponse<void>, void>({
      query: () => ({
        url: `/auth/sign-out`,
        method: 'POST',
      }),
    }),

    checkUser: builder.query<HttpResponse<void>, void>({
      query: () => ({
        url: `/user/check-user`,
        method: 'GET',
      }),
    }),
  }),

  tagTypes: [...user, hotel],
});

export const {
  useRegistrationMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyOTPMutation,
  useResetPasswordMutation,
  useLazySignOutQuery,
  useCheckUserQuery,
} = api;
