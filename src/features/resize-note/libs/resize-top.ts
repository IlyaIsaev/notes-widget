import { Note } from "@shared/types/note";

type ResizeTopInput = {
  noteListRect: DOMRect;
  wrapRect: DOMRect;
  note: Note;
  verticalOffset: number;
  dragStartClientY: number;
};

export const resizeTop = ({
  noteListRect,
  wrapRect,
  note,
  verticalOffset,
  dragStartClientY,
}: ResizeTopInput) => {
  const minVerticalOffset = noteListRect.top - wrapRect.top;

  const newHeight = wrapRect.height - verticalOffset;

  if (newHeight < note.minHeight || verticalOffset < minVerticalOffset) {
    return {
      height: note.height,
      top: note.top,
    };
  }

  return {
    height: newHeight,
    top: dragStartClientY - noteListRect.top + verticalOffset,
  };
};
