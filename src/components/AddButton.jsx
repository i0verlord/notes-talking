import React from "react";
import Plus from "../icons/Plus";
import colors from "../assets/colors.json";
import { useRef } from "react";
import { db } from "../appwrite/databases";
import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import { fakeData } from "../assets/fakeData";

const AddButton = () => {
  const { setNotes } = useContext(NotesContext);
  const startingPos = useRef(10);

  const addNote = async () => {
    console.log("AddButton.addNote: start");

    // compute bottom-middle position for new note
    const cardWidth = 400;
    const cardHeight = 200;
    const x = Math.max(10, Math.round(window.innerWidth / 2 - cardWidth / 2));
    const y = Math.max(10, Math.round(window.scrollY + window.innerHeight - cardHeight - 40));

    const payload = {
      position: JSON.stringify({ x, y }),
      colors: JSON.stringify(colors[0]),
      body: JSON.stringify("")
    };

    startingPos.current += 10;

    try {
      const response = await db.notes.create(payload);
      console.log("AddButton.addNote: created", response);
      setNotes((prevState) => [response, ...(prevState || [])]);
    } catch (err) {
      console.error("AddButton.addNote.error", err);
      // fallback: create a local note so UI remains functional when backend is unavailable
      const fallback = {
        $id: `local-${Date.now()}`,
        position: JSON.stringify({ x, y }),
        colors: JSON.stringify(colors[0]),
        body: JSON.stringify("")
      };
      console.log("AddButton.addNote: using fallback note", fallback);
      setNotes((prevState) => [fallback, ...(prevState || [])]);
    }
  };

  return (
    <div id="add-btn" onClick={addNote}>
      <Plus />
    </div>
  );
};

export default AddButton;
