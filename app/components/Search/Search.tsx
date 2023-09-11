import { FormEvent } from "react";
import "./Search.css";

type SearchProps = {
  searchText: string;
  setSearchText: (text: string) => void;
  category: string;
  setCategory: (category: string) => void;
  order: string;
  setOrder: (order: string) => void;
  handleFormSubmit: (e: FormEvent) => void;
};

const Search = ({
  searchText,
  setSearchText,
  category,
  setCategory,
  order,
  setOrder,
  handleFormSubmit,
}: SearchProps) => {
  return (
    <form className="search__bar" onSubmit={handleFormSubmit}>
      <input
        className="book__search"
        type="search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
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
      <button className="search__btn btn" type="submit">
        Search
      </button>
    </form>
  );
};

export default Search;
