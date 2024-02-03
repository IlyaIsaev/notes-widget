import { Note as NoteType } from "@shared/types/note";
import { css, cx } from "@style/css";
import { ReactNode, memo, useEffect, useRef, useState } from "react";
import {
  changeNoteText,
  noteDragEnd,
  noteDragStart,
} from "../model/note-model";

const rootStyle = css({
  position: "absolute",
  border: "1px solid #ccc",
  p: "10px 15px",
  bg: "#fff",
  overflow: "hidden",
});

const resizeStyle = css({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  zIndex: 10,
});

const textStyle = css({
  wordBreak: "break-all",
});

const textareaStyle = css({
  w: "100%",
  h: "100%",
  resize: "none",
  position: "relative",
  zIndex: 100,
  outline: "none",
  scrollbarWidth: "none",

  _scrollbar: {
    display: "none",
  },
});

const NoteTextarea = memo<Pick<NoteType, "text" | "color" | "id">>(
  ({ id, text, color }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      textareaRef.current?.focus();
    }, []);

    return (
      <textarea
        className={textareaStyle}
        ref={textareaRef}
        style={{
          backgroundColor: color,
        }}
        value={text}
        onChange={(e) => {
          changeNoteText({ noteId: id, text: e.target.value });
        }}
      />
    );
  }
);

type NoteProps = {
  resize: ReactNode;
  className?: string;
} & NoteType;

export const Note = memo<NoteProps>(
  ({ id, text, color, resize, top, left, width, height, className }) => {
    const [editable, setEditable] = useState(false);

    return (
      <div
        className={cx(rootStyle, className)}
        style={{
          transform: `translate(${left}px,${top}px)`,
          width,
          height,
          backgroundColor: color,
        }}
        draggable={!editable}
        onDragStart={(e) => {
          noteDragStart({ e, noteId: id });
          setEditable(false);
        }}
        onMouseDown={() => {
          setEditable(false);
        }}
        onMouseUp={() => {
          setEditable(true);
        }}
        onDragEnd={(e) => {
          noteDragEnd(e);
        }}
      >
        {!editable && <span className={textStyle}>{text}</span>}

        {editable && <NoteTextarea id={id} text={text} color={color} />}

        <div className={resizeStyle}>{resize}</div>
      </div>
    );
  }
);
