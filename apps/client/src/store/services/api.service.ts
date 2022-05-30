import { CreateCardDto, LoginDto, UpdateSwimlanesDto } from '@85830/common-kit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../../authentication/dtos/user.dto';
import { Boat } from '../../common/dtos/boat.dto';
import { Swimlane } from '../../common/dtos/swimlane.dto';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.MODE === 'development' ? 'http://localhost:4000/api/v1' : 'https://85830.sdny.dev/api/v1',
    credentials: 'include',
  }),
  tagTypes: ['Swimlanes'],
  endpoints: builder => ({
    // Auth
    login: builder.mutation<User, LoginDto>({
      query: (data: LoginDto) => ({
        method: 'POST',
        url: '/auth/login',
        body: data,
      }),
      transformResponse: (response: Record<string, any>) => response.result,
    }),
    getProfile: builder.query<User, void>({
      query: () => ({ url: '/auth/profile' }),
      transformResponse: (response: Record<string, any>) => response.result,
    }),
    logout: builder.mutation<void, void>({
      query: () => ({ method: 'POST', url: '/auth/logout' }),
    }),
    // Boats
    getBoats: builder.query<Boat[], void>({
      query: () => ({ url: '/boats' }),
      transformResponse: (response: Record<string, any>) => response.result,
      providesTags: result =>
        result
          ? [...result.map(({ id }) => ({ type: 'Swimlanes' as const, id })), { type: 'Swimlanes', id: 'LIST' }]
          : [{ type: 'Swimlanes', id: 'LIST' }],
    }),
    // Card
    createCard: builder.mutation<void, CreateCardDto>({
      query: (data: CreateCardDto) => ({
        method: 'POST',
        url: '/cards',
        body: data,
      }),
      invalidatesTags: [{ type: 'Swimlanes', id: 'LIST' }],
    }),
    // Swimlanes
    getSwimlanes: builder.query<Swimlane[], void>({
      query: () => ({ url: '/swimlanes' }),
      transformResponse: (response: Record<string, any>) => response.result,
      providesTags: result =>
        result
          ? [...result.map(({ id }) => ({ type: 'Swimlanes' as const, id })), { type: 'Swimlanes', id: 'LIST' }]
          : [{ type: 'Swimlanes', id: 'LIST' }],
    }),
    updateSwimlanes: builder.mutation<Swimlane[], UpdateSwimlanesDto[]>({
      query: (data: UpdateSwimlanesDto[]) => ({
        method: 'PATCH',
        url: '/swimlanes',
        body: data,
      }),
      invalidatesTags: [{ type: 'Swimlanes', id: 'LIST' }],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProfileQuery,
  useLogoutMutation,
  useGetBoatsQuery,
  useCreateCardMutation,
  useGetSwimlanesQuery,
  useUpdateSwimlanesMutation,
} = api;
