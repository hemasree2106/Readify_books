import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="auth-container fb-layout">
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-heading">R.E.A.D.I.F.Y</div>
        <div className="auth-tagline"><i>Where Books Meet Readers...</i></div>
        <input
          type="email"
          placeholder="Enter you email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
