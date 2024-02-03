import { css, cx } from "@style/css";
import { PropsWithChildren, ReactNode, memo } from "react";
import { noteDrop, noteListDragOver } from "../model/note-model";

const rootStyle = css({
  position: "relative",
  border: "1px solid #ccc",
});

type NoteListProps = PropsWithChildren<{
  deleteNote: ReactNode;
  className?: string;
}>;

export const NoteList = memo<NoteListProps>(
  ({ deleteNote, children, className }) => {
    return (
      <div
        className={cx(rootStyle, className)}
        onDragOver={(e) => {
          e.preventDefault();

          noteListDragOver(e);
        }}
        onDrop={noteDrop}
      >
        {children}
        {deleteNote}
      </div>
    );
  }
);
