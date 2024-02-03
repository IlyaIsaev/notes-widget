import { Note } from "@shared/types/note";
import { css, cva } from "@style/css";
import { memo, useRef } from "react";
import { dragEnd, dragStart } from "../model/resize-note-model";

const resize = cva({
  base: {
    position: "absolute",
    opacity: 0,
  },
  variants: {
    position: {
      top: {
        h: "10px",
        top: "-5px",
        left: 0,
        right: 0,
        cursor: "row-resize",
      },
      right: {
        w: "10px",
        top: 0,
        bottom: 0,
        right: "-5px",
        cursor: "col-resize",
      },
      bottom: {
        h: "10px",
        bottom: "-5px",
        left: 0,
        right: 0,
        cursor: "row-resize",
      },
      left: {
        w: "10px",
        bottom: 0,
        top: 0,
        left: "-5px",
        cursor: "col-resize",
      },
      bottomRight: {
        w: "10px",
        h: "10px",
        bottom: "-5px",
        right: "-5px",
        cursor: "nwse-resize",
      },
      bottomLeft: {
        w: "10px",
        h: "10px",
        bottom: "-5px",
        left: "-5px",
        cursor: "nesw-resize",
      },
      topRight: {
        w: "10px",
        h: "10px",
        top: "-5px",
        right: "-5px",
        cursor: "nesw-resize",
      },
      topLeft: {
        w: "10px",
        h: "10px",
        top: "-5px",
        left: "-5px",
        cursor: "nwse-resize",
      },
    },
  },
});

const rootStyle = css({
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
});

type ResizeNoteProps = {
  noteId: Note["id"];
};

export const ResizeNote = memo<ResizeNoteProps>(({ noteId }) => {
  const ref = useRef(null);

  return (
    <div className={rootStyle} ref={ref}>
      {(
        [
          "top",
          "right",
          "bottom",
          "left",
          "bottomRight",
          "bottomLeft",
          "topRight",
          "topLeft",
        ] as const
      ).map((direction) => (
        <div
          key={direction}
          className={resize({ position: direction })}
          draggable
          onDragStart={(e) => {
            e.stopPropagation();

            e.dataTransfer.effectAllowed = "move";

            dragStart({ e, direction, noteId, wrapEl: ref.current });
          }}
          onDragEnd={(e) => {
            e.stopPropagation();

            dragEnd(e);
          }}
        ></div>
      ))}
    </div>
  );
});
