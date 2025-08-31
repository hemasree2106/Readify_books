import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./Header";
import BookList from "./BookList";
import Footer from "./Footer";
import Login from "./Login";
import Signup from "./Signup";
import Favorites from "./Favorites";

function App() {
  // Search term state
  const [searchTerm, setSearchTerm] = useState("Fictional");

  // Authentication state (default false for first load)
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("auth") === "true" || false
  );

  // Favorites state (store full book objects)
  const [favorites, setFavorites] = useState(
    () => JSON.parse(localStorage.getItem("favorites") || "[]")
  );

  // Login handler
  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("auth", "true");
  };

  // Logout handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("auth");
  };

  // Toggle favorite books
  const toggleFavorite = (book) => {
    let updatedFavorites;
    if (favorites.some((fav) => fav.id === book.id)) {
      updatedFavorites = favorites.filter((fav) => fav.id !== book.id);
    } else {
      updatedFavorites = [...favorites, book];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <Router>
      <div className="app">
        {/* Header only shows if logged in */}
        {isAuthenticated && (
          <Header
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onLogout={handleLogout}
          />
        )}

        <main>
          <Routes>
            {/* Home / Book List */}
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <BookList
                    searchTerm={searchTerm}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* Favorites Page */}
            <Route
              path="/favorites"
              element={
                isAuthenticated ? (
                  <Favorites favorites={favorites} toggleFavorite={toggleFavorite} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* Login Page */}
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
              }
            />

            {/* Signup Page */}
            <Route
              path="/signup"
              element={
                isAuthenticated ? <Navigate to="/" /> : <Signup onSignup={handleLogin} />
              }
            />
          </Routes>
        </main>

        {/* Footer only shows if logged in */}
        {isAuthenticated && <Footer />}
      </div>
    </Router>
  );
}

export default App;
