import Image from "next/image";
import Link from "next/link";
import "./Books.css";

type BooksProps = {
  books: BookItem[];
};

const Books = ({ books }: BooksProps) => {
  return (
    <div className="books__list">
      {books?.map((book) => (
        <Link href={`/book/${book.id}`} className="book__item" key={book.id}>
          {book.volumeInfo.imageLinks ? (
            <Image
              src={book.volumeInfo.imageLinks?.thumbnail}
              width={200}
              height={220}
              alt="book_img"
              className="book__image"
            />
          ) : (
            <Image
              src={"/no_image.png"}
              width={100}
              height={100}
              alt="book_img"
              className="book__image"
            />
          )}
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
  );
};

export default Books;
