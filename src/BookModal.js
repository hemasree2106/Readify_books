import React from "react";
import { FaHeart, FaRegHeart, FaTimes } from "react-icons/fa";
import "./BookModal.css";

function BookModal({ book, onClose, isFavorite, toggleFavorite }) {
  if (!book) return null;

  // Construct Google Books URL using the book id
  const googleBooksUrl = `https://books.google.com/books?id=${book.id}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>
        <img
          src={book.imageLinks?.thumbnail || "https://via.placeholder.com/150"}
          alt={book.title}
        />
        <h2>{book.title}</h2>
        <p className="author">{book.authors?.join(", ") || "Unknown"}</p>
        <p className="description">{book.description || "No description available."}</p>
        <div className="modal-actions">
          <button className="fav-btn" onClick={toggleFavorite}>
            {isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
          </button>
          <a
            className="open-btn"
            href={googleBooksUrl}  // <-- always navigates to Google Books
            target="_blank"
            rel="noreferrer"
          >
            View More
          </a>
        </div>
      </div>
    </div>
  );
}

export default BookModal;
