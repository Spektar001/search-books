import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "books/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.googleapis.com/",
  }),
  endpoints: (build) => ({
    getBookById: build.query<BookItem, string>({
      query: (id: string) => `books/v1/volumes/${id}`,
    }),
  }),
});

export const {
  useGetBookByIdQuery,
} = bookApi;
