import { $draggingNote, $noteList } from "@entities/note";
import { createEvent, sample } from "effector";
import { DragEvent } from "react";

export const deleteNote = createEvent<DragEvent>();

sample({
  clock: deleteNote,
  source: {
    noteList: $noteList,
    draggingNote: $draggingNote,
  },
  fn: ({ noteList, draggingNote }) =>
    noteList.filter((note) => note.id !== draggingNote?.id),
  target: $noteList,
});
