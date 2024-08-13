import React, { useEffect, useRef, useState } from "react";
import Trash from "../icons/Trash";
import { setNewOffset, autoGrow, setZIndex, bodyParser } from "../utils";

const NoteCard = ({ note }) => {
  const body = bodyParser(note.body);
  const [position, setPosition] = useState(JSON.parse(note.position));
  const colors = JSON.parse(note.colors);

  let mouseStartPos = { x: 0, y: 0 };
  const cardRef = useRef(null);

  const textArearef = useRef(null);

  useEffect(() => { 
    autoGrow(textArearef);
  }, []);

  const mouseDown = (e) => {
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;
 
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);

    setZIndex(cardRef.current);
  }

  const mouseMove = (e) => {
    let mouseMoveDir = {
        x: mouseStartPos.x - e.clientX,
        y: mouseStartPos.y - e.clientY,
    };
 
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
    setPosition(newPosition);
  };

  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
  };

  return<div
    className="card"
    ref={cardRef}
    style={{
      backgroundColor: colors.colorBody,
      left: `${position.x}px`,
      top: `${position.y}px`,
    }}
  >
    <div 
      className="card-header"
      onMouseDown={mouseDown}
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
        onFocus={() => {
          setZIndex(cardRef.current)
        }}
      ></textarea>
    </div>
  </div>
}

export default NoteCard;