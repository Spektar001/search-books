"use client";
import "./page.css";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("all");
  const [order, setOrder] = useState("relevance");
  const [books, setBooks] = useState<BookItem[]>([]);
  const [totalBooks, setTotalBooks] = useState(0);
  let startIndex = 0;

  const handleSearch = async () => {
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
        <button className="search__btn btn" onClick={handleSearch}>
          Search
        </button>
      </div>
      <p className="total__books">{`Total books found: ${totalBooks}`}</p>
      <div className="books__list">
        {books?.map((book) => (
          <Link href={`/book/${book.id}`} className="book__item" key={book.id}>
            <Image
              src={book.volumeInfo.imageLinks?.smallThumbnail}
              width={200}
              height={220}
              alt="book_image"
            />
            <div className="book__info">
              <p className="book__info_title">{book.volumeInfo.title}</p>
              <p className="book__info_category">
                <span className="info">Category: </span>
                {book.volumeInfo.categories?.[0]}
              </p>
              <p className="book__info_authors">
                <span className="info">Authors: </span>
                {book.volumeInfo.authors?.join(", ")}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {books.length < totalBooks && (
        <button className="load__btn btn" onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default Home;
