import React from "react";
import "./BookCard.css";

function BookCard({ book, onClick }) {
  return (
    <div className="book-card" onClick={onClick}>
      <img
        className="book-image"
        src={book.imageLinks?.thumbnail || "https://via.placeholder.com/120x180"}
        alt={book.title}
      />
      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">{book.authors ? book.authors.join(", ") : "Unknown"}</p>
      <p className="book-description">
        {book.description ? book.description.substring(0, 60) + "..." : "No description"}
      </p>
    </div>
  );
}

export default BookCard;
