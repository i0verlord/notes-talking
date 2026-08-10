import { useEffect, useState } from "react";
import NotesPage from "./pages/NotesPage";
import NotesProvider from "./context/NotesContext";
import LoginPage from "./pages/LoginPage";

const AUTH_KEY = "notes-talking-authenticated";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(AUTH_KEY);
    setAuthenticated(saved === "true");
  }, []);

  const handleLogin = ({ name, password }) => {
    localStorage.setItem(AUTH_KEY, "true");
    localStorage.setItem("notes-talking-user", name);
    setAuthenticated(true);
  };

  return (
    <div id="app">
      {authenticated ? (
        <div className="app-content">
          <NotesProvider>
            <NotesPage />
          </NotesProvider>
        </div>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;