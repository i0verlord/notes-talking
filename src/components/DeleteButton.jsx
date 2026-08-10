import React from "react";
import Trash from "../icons/Trash";
import { db } from "../appwrite/databases";
import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";

const DeleteButton = ({ noteId }) => {
  const { setNotes } = useContext(NotesContext);

  const handleDelete = async (e) => {
    console.log("DeleteButton.handleDelete", { noteId });
    try {
      await db.notes.delete(noteId);
      console.log("DeleteButton.handleDelete.success", noteId);
    } catch (err) {
      console.error("DeleteButton.handleDelete.error", err);
      // still remove from UI so user sees immediate response
    }
    setNotes((prevState) => (prevState || []).filter((note) => note.$id !== noteId));
  };
  return (
    <div onClick={handleDelete}>
      <Trash />
    </div>
  );
};

export default DeleteButton;
