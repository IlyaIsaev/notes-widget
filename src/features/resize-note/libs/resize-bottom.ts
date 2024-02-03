import { Note } from "@shared/types/note";

type ResizeBottomInput = {
  noteListRect: DOMRect;
  wrapRect: DOMRect;
  note: Note;
  verticalOffset: number;
};

export const resizeBottom = ({
  noteListRect,
  wrapRect,
  note,
  verticalOffset,
}: ResizeBottomInput) => {
  const maxVerticalOffset = noteListRect.bottom - wrapRect.bottom;

  const newHeight = wrapRect.height + verticalOffset;

  if (newHeight < note.minHeight || verticalOffset > maxVerticalOffset) {
    return {
      height: note.height,
    };
  }

  return {
    height: newHeight,
  };
};
