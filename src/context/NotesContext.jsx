import { createContext, useEffect, useState } from "react";
import Spinner from "../icons/Spinner";
import { db } from "../appwrite/databases";

export const NotesContext = createContext();

const LOCAL_KEY = "notes-talking-local-notes";

const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    init();
  }, []);

  // persist notes to localStorage whenever they change
  useEffect(() => {
    try {
      if (notes && Array.isArray(notes)) {
        localStorage.setItem(LOCAL_KEY, JSON.stringify(notes));
      }
    } catch (err) {
      console.error("Failed to write notes to localStorage:", err);
    }
  }, [notes]);

  const init = async () => {
    try {
      const response = await db.notes.list();
      setNotes(response.documents);
    } catch (err) {
      console.error("Failed to load notes:", err);
      // fallback: try loading from localStorage
      try {
        const cached = localStorage.getItem(LOCAL_KEY);
        if (cached) {
          setNotes(JSON.parse(cached));
        } else {
          setNotes([]);
        }
      } catch (le) {
        console.error("Failed to parse local notes:", le);
        setNotes([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const contextData = { notes, setNotes, selectedNote, setSelectedNote };

  return (
    <NotesContext.Provider value={contextData}>
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Spinner size="100" />
        </div>
      ) : (
        children
      )}
    </NotesContext.Provider>
  );
};

export default NoteProvider;