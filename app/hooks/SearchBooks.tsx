import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { addBooks, addCount, deleteBooks } from "@/app/store/slice/booksSlice";
import { changeStartIndex } from "@/app/store/slice/searchValuesSlice";

const useSearchBooks = () => {
  const dispatch = useAppDispatch();
  const API_KEY = process.env.NEXT_PUBLIC_PUBLICAPI_KEY;

  const { values } = useAppSelector((state) => state.searchValuesSlice);
  const baseURL = `https://www.googleapis.com/books/v1/volumes?q=${values.searchValue}&startIndex=${values.startIndex}&maxResults=30&orderBy=${values.order}&key=${API_KEY}`;

  const baseURLWithCategory = `https://www.googleapis.com/books/v1/volumes?q=${values.searchValue}+subject:${values.category}&startIndex=${values.startIndex}&maxResults=30&orderBy=${values.order}&key=${API_KEY}`;

  const searchBooks = (firstRender: boolean) => {
    if (firstRender) {
      dispatch(deleteBooks());
      getBooks();
    } else {
      getBooks();
    }
  };

  const getBooks = async () => {
    try {
      let response;
      if (values.category !== "all") {
        response = await fetch(baseURLWithCategory);
      } else {
        response = await fetch(baseURL);
      }
        const data = await response.json();
        const { items, totalItems } = data;
        items.map((item: BookItem) =>
          dispatch(
            addBooks({
              id: item.id,
              volumeInfo: item.volumeInfo,
            })
          )
        );
        dispatch(addCount(totalItems));
        dispatch(changeStartIndex());
    } catch (error) {
      console.error(error);
    }
  };
  return { searchBooks };
};

export default useSearchBooks;
