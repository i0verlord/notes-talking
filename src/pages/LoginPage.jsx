import { useState } from "react";

const LoginPage = ({ onLogin }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim() || !password) {
      setError("Please enter both name and password.");
      return;
    }
    setError("");
    onLogin({ name: name.trim(), password });
  };

  return (
    <div className="login-overlay">
      <div className="login-card">
        <h1>Login</h1>
        <p>Please sign in to continue.</p>
        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="login-name">Name</label>
          <input
            id="login-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />

          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
