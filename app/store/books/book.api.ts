import { API_KEY } from "@/app/Key/Key";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GetBooksQueryParams {
  value?:string;
  searchText?: string;
  category?: string;
  startIndex?: number;
  order?: string;
}

export const bookApi = createApi({
  reducerPath: "books/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.googleapis.com/",
  }),
  endpoints: (build) => ({
    getBooks: build.query<RootBook, GetBooksQueryParams>({
      query: ({ value, category, startIndex, order }) =>
        `books/v1/volumes?q=${value}+subject:${category}&startIndex=${startIndex}&maxResults=30&orderBy=${order}&key=${API_KEY}`,
    }),
    getBooksCategoryAll: build.query<
      RootBook,
      { value: string; startIndex: number; order: string }
    >({
      query: ({ value, startIndex, order }) =>
        `books/v1/volumes?q=${value}&startIndex=${startIndex}&maxResults=30&orderBy=${order}&key=${API_KEY}`,
    }),
    getBookById: build.query<BookItem, string>({
      query: (id: string) => `books/v1/volumes/${id}`,
    }),
  }),
});

export const {
  useGetBooksCategoryAllQuery,
  useGetBooksQuery,
  useGetBookByIdQuery,
} = bookApi;
