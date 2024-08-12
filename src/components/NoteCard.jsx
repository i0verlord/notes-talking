import React, { useEffect, useRef } from "react";
import Trash from "../icons/Trash";

const NoteCard = ({ note }) => {
  const body = JSON.parse(note.body);
  const position = JSON.parse(note.position);
  const colors = JSON.parse(note.colors);

  const textArearef = useRef(null);

  useEffect(() => { 
    autoGrow(textArearef);
  }, []);

  const autoGrow = (textarea) => {
    const { current } = textArearef;

    current.style.height = "auto";
    current.style.height = current.scrollHeight + "px";
  }

  return<div 
    className="card"
    style={{
      backgroundColor: colors.colorBody,
      left: `${position.x}px`,
      top: `${position.y}px`,
    }}
  >
    <div 
      className="card-header"
      style={{ backgroundColor: colors.colorBody }}
    >
      <Trash />
    </div>
    <div className="card-body">
      <textarea
        style={{ color: colors.colorText }}
        defaultValue = {body}
        ref={textArearef}
        onInput={() => {
          autoGrow(textArearef)
        }}
      ></textarea>
    </div>
  </div>
}

export default NoteCard;