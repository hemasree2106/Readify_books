import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import BookModal from "./BookModal";
import "./BookList.css";

const API_KEY = "AIzaSyBP98oX9mvX6tE_SQvQzLK2SKPZYjPJqWo";

function BookList({ searchTerm }) {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!searchTerm) return;

    const fetchBooks = async () => {
      setLoading(true);
      setError("");
      try {
        const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          searchTerm
        )}&key=${API_KEY}`;
        console.log("Fetching:", url);

        const res = await fetch(url);
        const data = await res.json();
        console.log("Google API response:", data);

        if (data.error) {
          setError(data.error.message || "Error fetching books");
          setBooks([]);
        } else {
          const fetchedBooks =
            data.items?.map((item) => ({
              id: item.id,
              title: item.volumeInfo?.title || "No Title",
              authors: item.volumeInfo?.authors || ["Unknown Author"],
              description:
                item.volumeInfo?.description || "No description available",
              imageLinks: item.volumeInfo?.imageLinks,
              infoLink: item.volumeInfo?.infoLink,
            })) || [];
          setBooks(fetchedBooks);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch books. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [searchTerm]);

  const toggleFavorite = (book) => {
    let updated;
    if (favorites.some((fav) => fav.id === book.id)) {
      updated = favorites.filter((fav) => fav.id !== book.id);
    } else {
      updated = [...favorites, book]; // store full book object, not just ID
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="booklist-container">
      {loading && <p>Loading books...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && books.length === 0 && !error && (
        <p>No books found. Try searching!</p>
      )}

      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onClick={() => setSelectedBook(book)}
        />
      ))}

      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          isFavorite={favorites.some((fav) => fav.id === selectedBook.id)}
          toggleFavorite={() => toggleFavorite(selectedBook)}
        />
      )}
    </div>
  );
}

export default BookList;
