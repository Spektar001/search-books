"use client";
import { useState } from "react";
import Books from "./components/Books/Books";
import Search from "./components/Search/Search";
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="books__wrapper">
      <Search
        searchText={searchText}
        setSearchText={setSearchText}
        category={category}
        setCategory={setCategory}
        order={order}
        setOrder={setOrder}
        handleFormSubmit={handleFormSubmit}
      />
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
