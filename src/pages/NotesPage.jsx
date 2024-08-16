import NoteCard from "../components/NoteCard";
import Controls from "../components/Controls";
import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";

const NotesPage = () => {
  const { notes } = useContext(NotesContext);

  return (
    <div>
      {notes.map((note) => (
        <NoteCard key={note.$id} note={note} />
      ))}
      <Controls />
    </div>
  );
};

export default NotesPage;