import { API_KEY } from "@/app/Key/Key";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GetBooksQueryParams {
  searchText: string;
  category: string;
  startIndex: number;
  order: string;
}

export const bookApi = createApi({
  reducerPath: "books/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.googleapis.com/",
  }),
  endpoints: (build) => ({
    getBooks: build.query<BookItem[], GetBooksQueryParams>({
      query: ({ searchText, category, startIndex, order }) =>
        `books/v1/volumes?q=${searchText}+subject:${category}&startIndex=${startIndex}&maxResults=30&orderBy=${order}&key=${API_KEY}`,
    }),
    getBooksCategoryAll: build.query<
      BookItem[],
      { searchText: string; startIndex: number; order: string }
    >({
      query: ({ searchText, startIndex, order }) =>
        `books/v1/volumes?q=${searchText}&startIndex=${startIndex}&maxResults=30&orderBy=${order}&key=${API_KEY}`,
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
