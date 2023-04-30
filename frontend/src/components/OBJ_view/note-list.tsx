import React from "react";
import styleSidebar from '@/styles/Sidebar.module.css';
import stylesButton from '@/styles/Buttons.module.css';


interface NoteListProps {
  notes: string[];
}

const NoteList: React.FC<NoteListProps> = ({ notes }) => {
    return (
        <ul className={stylesButton.note_list}>
          {notes.map((note) => (
            <li key={note}
            className={stylesButton.notes_btn} >{note}</li>
          ))}
        </ul>
      );
    };

export default NoteList;
