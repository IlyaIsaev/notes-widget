import { $noteList } from "@entities/note";
import { createEvent, sample } from "effector";
import { nanoid } from "nanoid";
import { MouseEvent } from "react";

export const createNote = createEvent<MouseEvent>();

sample({
  clock: createNote,
  source: $noteList,
  fn: (noteList) => [
    ...noteList,
    {
      id: nanoid(),
      text: "Note",
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      top: 0,
      left: 0,
      width: 100,
      height: 100,
      minHeight: 100,
      minWidth: 100,
    },
  ],
  target: $noteList,
});
