import Image from "next/image";
import "./page.css";

const getBookById = async (id: string): Promise<BookItem> => {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes/${id}`
  );
  const book = await response.json();
  return book;
};

const BookPage = async ({ params }: { params: { id: string } }) => {
  const book = await getBookById(params.id);

  return (
    <div className="book">
      {book.volumeInfo.imageLinks ? (
        <Image
          src={book.volumeInfo.imageLinks?.thumbnail}
          width={450}
          height={550}
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
      <h2 className="book__title">{book.volumeInfo.title}</h2>
      <div className="book__info">
        <p className="book__info_category">
          <span className="info">Category: </span>
          {book.volumeInfo.categories?.join(", ")}
        </p>
        <p className="book__info_authors">
          <span className="info">Authors: </span>
          {book.volumeInfo.authors?.join(", ")}
        </p>
        <p className="book__info_description">
          <span className="info">Description: </span>
          {book.volumeInfo.description}
        </p>
      </div>
    </div>
  );
};

export default BookPage;
