"use client";
import Image from "next/image";
import "./page.css";
import { useAppSelector } from "@/app/store/hooks";
import { useGetBookByIdQuery } from "@/app/store/books/book.api";

const BookPage = ({ params }: { params: { id: string } }) => {
  let itemID = useAppSelector((state) => state.booksSlice.id);
  itemID = params.id;
  const { data } = useGetBookByIdQuery(itemID);

  return (
    <div className="book">
      {data?.volumeInfo.imageLinks ? (
        <Image
          src={data?.volumeInfo.imageLinks?.thumbnail}
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
      <h2 className="book__title">{data?.volumeInfo.title}</h2>
      <div className="book__info">
        <p className="book__info_category">
          <span className="info">Category: </span>
          {data?.volumeInfo.categories?.join(", ")}
        </p>
        <p className="book__info_authors">
          <span className="info">Authors: </span>
          {data?.volumeInfo.authors?.join(", ")}
        </p>
        <p className="book__info_description">
          <span className="info">Description: </span>
          {data?.volumeInfo.description}
        </p>
      </div>
    </div>
  );
};

export default BookPage;
