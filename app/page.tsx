"use client";
import { useState } from "react";
import Books from "./components/Books/Books";
import "./page.css";

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("all");
  const [order, setOrder] = useState("relevance");
  const [books, setBooks] = useState<BookItem[]>([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [loading, setLoading] = useState(false);
  let startIndex = 0;

  const handleSearch = async () => {
    setLoading(true);
    const API_KEY = "AIzaSyAlD1Eh8caasFRVd1XYkn37HiAdiaf9GTs";
    let API_URL = `https://www.googleapis.com/books/v1/volumes?q=${searchText}&startIndex=${startIndex}&maxResults=30&orderBy=${order}`;

    if (category !== "all") {
      API_URL = `https://www.googleapis.com/books/v1/volumes?q=${searchText}+subject:${category}&startIndex=${startIndex}&maxResults=30&orderBy=${order}`;
    }
    const response = await fetch(`${API_URL}&key=${API_KEY}`);
    const data = await response.json();
    const { items, totalItems } = data;

    if (startIndex > 0) {
      setBooks((prevBooks) => [...prevBooks, ...items]);
    } else {
      setBooks(items);
    }
    setTotalBooks(totalItems);
    setLoading(false);
  };

  const handleLoadMore = () => {
    startIndex += 30;
    handleSearch();
  };

  return (
    <div className="books__wrapper">
      <div className="search__bar">
        <input
          className="book__search"
          type="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <div className="select__bar">
          <select
            className="books__category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          >
            <option value="relevance">Relevance</option>
            <option value="newest">Newest</option>
          </select>
        </div>
        <button className="search__btn btn" onClick={handleSearch}>
          Search
        </button>
      </div>
      <p className="total__books">{`Total books found: ${totalBooks}`}</p>
      {loading ? (
        <h2 className="loader">Loading...</h2>
      ) : (
        <Books books={books} />
      )}
      {books.length < totalBooks && (
        <button className="load__btn btn" onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default Home;
