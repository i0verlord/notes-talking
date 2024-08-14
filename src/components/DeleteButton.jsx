import React from 'react'
import Trash from '../icons/Trash'
import { db } from '../appwrite/databases';

const DeleteButton = ({ noteId, setNotes }) => {
  const handleDelete = async () => {
    db.notes.delete(noteId)
    setNotes((prevState) => 
      prevState.filter((note) => note.$id !== noteId)
    );
  };
  return (
    <div onClick={handleDelete}><Trash /></div>
  );
};

export default DeleteButton;