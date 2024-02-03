import { Note } from "@shared/types/note";

type ResizeLeftInput = {
  noteListRect: DOMRect;
  wrapRect: DOMRect;
  note: Note;
  horizontalOffset: number;
  dragStartClientX: number;
};

export const resizeLeft = ({
  noteListRect,
  wrapRect,
  note,
  horizontalOffset,
  dragStartClientX,
}: ResizeLeftInput) => {
  const minHorizontalOffset = noteListRect.left;

  const newWidth = wrapRect.width - horizontalOffset;

  if (newWidth < note.minWidth || newWidth < minHorizontalOffset) {
    return {
      width: note.width,
      left: note.left,
    };
  }

  return {
    width: newWidth,
    left: dragStartClientX - noteListRect.left + horizontalOffset,
  };
};
