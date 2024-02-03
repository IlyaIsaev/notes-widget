import { Note } from "@shared/types/note";
import { createEvent, createStore, sample } from "effector";
import { DragEvent } from "react";

import { persist } from "effector-storage/local";

export const noteDragStart = createEvent<{
  e: DragEvent;
  noteId: Note["id"];
}>();

export const noteDragEnd = createEvent<DragEvent>();

export const noteDrop = createEvent<DragEvent>();

export const noteListDragOver = createEvent<DragEvent>();

export const changeNoteText = createEvent<{
  noteId: Note["id"];
  text: string;
}>();

export const $noteList = createStore<Note[]>([]);

persist({ store: $noteList, key: "noteList" });

export const $draggingNote = createStore<{
  id: Note["id"];
  topDiff: number;
  leftDiff: number;
  noteRect: DOMRect;
} | null>(null);

sample({
  clock: noteDragStart,
  fn: ({ e, noteId }) => {
    const cursorX = e.clientX;
    const cursorY = e.clientY;
    const noteRect = e.currentTarget.getBoundingClientRect();

    return {
      id: noteId,
      topDiff: cursorY - noteRect.top,
      leftDiff: cursorX - noteRect.left,
      noteRect,
    };
  },
  target: $draggingNote,
});

// calculcation of the new position of a dragged note
sample({
  clock: noteDrop,
  source: {
    noteList: $noteList,
    draggingNote: $draggingNote,
  },
  fn: ({ noteList, draggingNote }, e) => {
    const cursorX = e.clientX;

    const cursorY = e.clientY;

    const noteListRect = e.currentTarget.getBoundingClientRect();

    const { editedNote, noteListTail } = noteList.reduce(
      (acc, note) => {
        if (noteListRect && draggingNote && note.id === draggingNote.id) {
          const newTop = cursorY - draggingNote.topDiff - noteListRect.top;

          const minTop = 0;

          const maxTop = noteListRect.height - draggingNote.noteRect.height;

          const newLeft = cursorX - draggingNote.leftDiff - noteListRect.left;

          const minLeft = 0;

          const maxLeft = noteListRect.width - draggingNote.noteRect.width;

          const left =
            newLeft < minLeft ? minLeft : newLeft > maxLeft ? maxLeft : newLeft;

          const top =
            newTop < minTop ? minTop : newTop > maxTop ? maxTop : newTop;

          return {
            editedNote: {
              ...note,
              left,
              top,
            },
            noteListTail: acc.noteListTail,
          };
        }

        return {
          editedNote: acc.editedNote,
          noteListTail: [...acc.noteListTail, note],
        };
      },
      {
        editedNote: null as Note | null,
        noteListTail: [] as Note[],
      }
    );

    // put the dragging note on top of all others notes
    return editedNote ? [...noteListTail, editedNote] : noteListTail;
  },
  target: $noteList,
});

sample({
  clock: changeNoteText,
  source: $noteList,

  fn: (noteList, { noteId, text }) =>
    noteList.map((note) => (noteId === note.id ? { ...note, text } : note)),

  target: $noteList,
});

sample({
  clock: noteDragEnd,
  fn: () => null,
  target: $draggingNote,
});
