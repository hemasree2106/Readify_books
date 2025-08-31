import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header({ searchTerm, setSearchTerm, onLogout }) {
  const [input, setInput] = useState(""); // Local input
  const navigate = useNavigate(); // For programmatic navigation

  const handleSearch = () => setSearchTerm(input);
  const handleEnter = (e) => { if (e.key === "Enter") handleSearch(); }

  // New function to navigate to Favorites page
  const goToFavorites = () => {
    navigate("/favorites");
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <Link to="/" className="logo-link"><h1><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3"><path d="M440-278v-394q-41-24-87-36t-93-12q-36 0-71.5 7T120-692v396q35-12 69.5-18t70.5-6q47 0 91.5 10.5T440-278Zm40 118q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q74 0 126 17t112 52q11 6 16.5 14t5.5 21v418q44-21 88.5-31.5T700-320q36 0 70.5 6t69.5 18v-481q15 5 29.5 11t28.5 14q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59Zm140-240v-440l120-40v440l-120 40Zm-340-99Z"/></svg>    R.E.A.D.I.F.Y</h1></Link>
      </div>

      <div className="header-center">
        <input
          type="text"
          placeholder="Search for books..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleEnter}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="header-right">
        {/* Remove dark mode toggle and replace with "Saved" button */}
        <button className="fav-btn" onClick={goToFavorites}>Saved</button>

        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>
    </header>
  );
}

export default Header;
