import { css } from "@style/css";
import { createNote } from "../model/create-note-model";

const rootStyle = css({
  cursor: "pointer",
  padding: "10px 15px",
  border: "1px solid #ccc",
});

export const CreateNote = () => (
  <button className={rootStyle} onClick={createNote}>
    Create note
  </button>
);
