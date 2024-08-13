import {useState, useEffect} from 'react';
import { db } from '../appwrite/databases';
import NoteCard from '../components/NoteCard';
import { databases } from '../appwrite/config';

const NotesPage = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    init();
  }, [])

  const init = async () => {
    const response = await db.notes.list();
    setNotes(response.documents);
  };

  return (
    <div>
      {notes.map(note => (
        <NoteCard note={note} key={note.$id} />
      ))}
    </div>
  )
}

export default NotesPage;