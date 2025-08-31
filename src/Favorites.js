import React from "react";
import BookCard from "./BookCard";
import BookModal from "./BookModal";

function Favorites({ favorites, toggleFavorite }) {
  const [selectedBook, setSelectedBook] = React.useState(null);

  if (!favorites || favorites.length === 0) return <p>No favorites yet!</p>;

  return (
    <div className="favorites-list">
      {favorites.map((book) => (
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

export default Favorites;
