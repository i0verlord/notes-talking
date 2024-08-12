import React from "react";
import Trash from "../icons/Trash";

const NoteCard = ({ note }) => {
  const body = JSON.parse(note.body);
  const position = JSON.parse(note.position);
  const colors = JSON.parse(note.colors);

  return<div 
    className="card"
    style={{
      backgroundColor: colors.colorBody,
    }}
  >
    <div 
      className="card-header"
      style={{ backgroundColor: colors.colorHeader }}
    >
      <Trash />
    </div>
    <div className="card-body">
      <textarea
        style={{ color: colors.colorText }}
        defaultValue = {body}
      ></textarea>
    </div>
  </div>
}

export default NoteCard;