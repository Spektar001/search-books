"use client";
import useSearchBooks from "@/app/hooks/SearchBooks";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  changeCategory,
  changeOrder,
  changeSearchValue,
  clearStartIndex,
} from "@/app/store/slice/searchValuesSlice";
import { useEffect, useRef } from "react";
import "./Search.css";

const Search = () => {
  const dispatch = useAppDispatch();
  const { values } = useAppSelector((state) => state.searchValuesSlice);
  const { searchBooks } = useSearchBooks();
  const firstRender = useRef(true);

  function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault();
    searchBooks(true);
  }

  useEffect(() => {
    if (!firstRender.current) {
      dispatch(clearStartIndex());
    } else {
      firstRender.current = false;
    }
  }, [values.category, values.searchValue, values.order]);

  return (
    <form className="search__bar" onSubmit={handleFormSubmit}>
      <input
        className="book__search"
        type="search"
        value={values.searchValue}
        onChange={(e) => dispatch(changeSearchValue(e.target.value))}
        placeholder="Search..."
        required
      />
      <div className="select__bar">
        <select
          className="books__category"
          value={values.category}
          onChange={(e) => dispatch(changeCategory(e.target.value))}
        >
          <option value="all">All</option>
          <option value="art">Art</option>
          <option value="biography">Biography</option>
          <option value="computers">Computers</option>
          <option value="history">History</option>
          <option value="medical">Medical</option>
          <option value="poetry">Poetry</option>
        </select>
        <select
          className="books__order"
          value={values.order}
          onChange={(e) => dispatch(changeOrder(e.target.value))}
        >
          <option value="relevance">Relevance</option>
          <option value="newest">Newest</option>
        </select>
      </div>
      <button className="search__btn btn" type="submit">
        Search
      </button>
    </form>
  );
};

export default Search;
