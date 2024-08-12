import React from "react";

const NoteCard = ({ note }) => {
  const body = JSON.parse(note.body);
  return<div>{body}</div>
}

export default NoteCard;