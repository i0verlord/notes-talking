import React from 'react';
import { fakeData as notes } from '../assets/fakeData';
import NoteCard from '../components/NoteCard';

const NotesPage = () => {
  return (
    <div>
      {notes.map(note => (
        <NoteCard note={note} key={note.$id} />
      ))}
    </div>
  )
}

export default NotesPage;