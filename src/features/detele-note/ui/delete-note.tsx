import { css, cx } from "@style/css";
import { deleteNote } from "../model/delete-note-mode";

const rootStyle = css({
  w: "100%",
  h: "100px",
  bg: "#eee",
});

type DeleteNoteProps = {
  className?: string;
};

export const DeleteNote = ({ className }: DeleteNoteProps) => {
  return (
    <div
      className={cx(rootStyle, className)}
      onDrop={deleteNote}
      onDragOver={(e) => {
        e.preventDefault();
      }}
    >
      Delete a note
    </div>
  );
};
