import { $noteList, Note, NoteList } from "@entities/note";
import { CreateNote } from "@features/create-note";
import { DeleteNote } from "@features/detele-note";
import { ResizeNote } from "@features/resize-note";
import { css, cx } from "@style/css";
import { vstack } from "@style/patterns";
import { useUnit } from "effector-react";

const Z_INDEX_NOTE = 10;

const Z_INDEX_DELETE_NOTE_AREA = Z_INDEX_NOTE / 2;

const rootStyle = css({
  w: "100vw",
  h: "100vh",
});

const noteListStyle = css({
  flexGrow: 1,
});

const deleteNoteStyle = css({
  position: "absolute",
  left: 0,
  bottom: 0,
  zIndex: Z_INDEX_DELETE_NOTE_AREA,
});

const noteStyle = css({
  zIndex: Z_INDEX_NOTE,
});

export const Notes = () => {
  const [noteList] = useUnit([$noteList]);

  return (
    <div
      className={cx(
        rootStyle,
        vstack({ gap: 0, alignItems: "stretch", justify: "stretch" })
      )}
    >
      <CreateNote />

      <NoteList
        className={noteListStyle}
        deleteNote={<DeleteNote className={deleteNoteStyle} />}
      >
        {noteList.map((note) => (
          <Note
            className={noteStyle}
            key={note.id}
            {...note}
            resize={<ResizeNote noteId={note.id} />}
          />
        ))}
      </NoteList>
    </div>
  );
};
