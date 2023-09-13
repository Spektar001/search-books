"use client";
import Books from "./components/Books/Books";
import Search from "./components/Search/Search";
import useSearchBooks from "./hooks/SearchBooks";
import "./page.css";
import { useAppSelector } from "./store/hooks";

const Home = () => {
  const { books, count } = useAppSelector((state) => state.bookSlice);
  const { searchBooks } = useSearchBooks();

  const handleLoadMore = () => {
    searchBooks(false);
  };

  return (
    <div className="books__wrapper">
      <Search />
      {books.length !== 0 && (
        <p className="total__books">{`Total books found: ${count}`}</p>
      )}
      <Books />
      {books.length !== 0 && (
        <button className="load__btn btn" onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default Home;
