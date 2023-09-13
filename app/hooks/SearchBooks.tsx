import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { addBooks, addCount, deleteBooks } from "@/app/store/slice/booksSlice";
import { changeStartIndex } from "@/app/store/slice/searchValuesSlice";
import { API_KEY } from "../Key/Key";

const useSearchBooks = () => {
  const dispatch = useAppDispatch();
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
      if (values.category !== "all") {
        const response = await fetch(baseURLWithCategory);
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
      } else {
        const response = await fetch(baseURL);
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
      }
    } catch (error) {
      console.error(error);
    }
  };
  return { searchBooks };
};

export default useSearchBooks;