import { $noteList, noteListDragOver } from "@entities/note";
import { Note } from "@shared/types/note";
import { createEvent, createStore, sample } from "effector";
import { DragEvent } from "react";
import { resizeBottom } from "../libs/resize-bottom";
import { resizeLeft } from "../libs/resize-left";
import { resizeRight } from "../libs/resize-right";
import { resizeTop } from "../libs/resize-top";

export type Direction =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "bottomRight"
  | "bottomLeft"
  | "topRight"
  | "topLeft";

export const dragStart = createEvent<{
  e: DragEvent;
  wrapEl: HTMLDivElement | null;
  direction: Direction;
  noteId: Note["id"];
}>();

export const dragEnd = createEvent<DragEvent>();

const $draggingNoteControl = createStore<{
  e: DragEvent;
  direction: Direction;
  noteId: Note["id"];
  // dimensions of the resizing note
  wrapRect: DOMRect;
} | null>(null);

sample({
  clock: dragStart,
  fn: ({ e, wrapEl, direction, noteId }) =>
    wrapEl
      ? {
          e,
          noteId,
          direction,
          wrapRect: wrapEl.getBoundingClientRect(),
        }
      : null,
  target: $draggingNoteControl,
});

sample({
  clock: dragEnd,
  fn: () => null,
  target: $draggingNoteControl,
});

// resizing a note by dragging hidden controls positioned on the borders and
// cornerns of the note
sample({
  clock: noteListDragOver,

  source: { noteList: $noteList, draggingNoteControl: $draggingNoteControl },

  fn: ({ draggingNoteControl, noteList }, e) => {
    const dragEndClientY = e.clientY;

    const dragEndClientX = e.clientX;

    const noteListRect = e.currentTarget.getBoundingClientRect();

    return noteList.map((note) => {
      if (draggingNoteControl && note.id === draggingNoteControl.noteId) {
        const { e: dragStartEvent, direction, wrapRect } = draggingNoteControl;

        const dragStartClientY = dragStartEvent.clientY;

        const dragStartClientX = dragStartEvent.clientX;

        const verticalOffset = dragEndClientY - dragStartClientY;

        const horizontalOffset = dragEndClientX - dragStartClientX;

        if (direction === "top") {
          return {
            ...note,

            ...resizeTop({
              noteListRect,
              wrapRect,
              note,
              verticalOffset,
              dragStartClientY,
            }),
          };
        }

        if (direction === "bottom") {
          return {
            ...note,

            ...resizeBottom({
              noteListRect,
              wrapRect,
              note,
              verticalOffset,
            }),
          };
        }

        if (direction === "right") {
          return {
            ...note,

            ...resizeRight({
              noteListRect,
              wrapRect,
              note,
              horizontalOffset,
            }),
          };
        }

        if (direction === "left") {
          return {
            ...note,

            ...resizeLeft({
              noteListRect,
              wrapRect,
              note,
              horizontalOffset,
              dragStartClientX,
            }),
          };
        }

        if (direction === "bottomRight") {
          return {
            ...note,

            ...resizeBottom({
              noteListRect,
              wrapRect,
              note,
              verticalOffset,
            }),

            ...resizeRight({
              noteListRect,
              wrapRect,
              note,
              horizontalOffset,
            }),
          };
        }

        if (direction === "bottomLeft") {
          return {
            ...note,

            ...resizeBottom({
              noteListRect,
              wrapRect,
              note,
              verticalOffset,
            }),

            ...resizeLeft({
              noteListRect,
              wrapRect,
              note,
              horizontalOffset,
              dragStartClientX,
            }),
          };
        }

        if (direction === "topRight") {
          return {
            ...note,

            ...resizeTop({
              noteListRect,
              wrapRect,
              note,
              verticalOffset,
              dragStartClientY,
            }),

            ...resizeRight({
              noteListRect,
              wrapRect,
              note,
              horizontalOffset,
            }),
          };
        }

        if (direction === "topLeft") {
          return {
            ...note,

            ...resizeTop({
              noteListRect,
              wrapRect,
              note,
              verticalOffset,
              dragStartClientY,
            }),

            ...resizeLeft({
              noteListRect,
              wrapRect,
              note,
              horizontalOffset,
              dragStartClientX,
            }),
          };
        }
      }

      return note;
    });
  },

  target: $noteList,
});
