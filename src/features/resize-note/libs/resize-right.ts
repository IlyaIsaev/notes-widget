import { Note } from "@shared/types/note";


type ResizeRightInput = {
  noteListRect: DOMRect;
  wrapRect: DOMRect;
  note: Note;
  horizontalOffset: number;
};

export const resizeRight = ({
  noteListRect,
  wrapRect,
  note,
  horizontalOffset,
}: ResizeRightInput) => {
  const maxHorizontalOffset = noteListRect.width - wrapRect.left;

  const newWidth = wrapRect.width + horizontalOffset;

  if (newWidth < note.minWidth || newWidth > maxHorizontalOffset) {
    return {
      width: note.width,
    };
  }

  return {
    width: newWidth,
  };
};
