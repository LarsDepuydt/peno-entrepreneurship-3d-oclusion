import React from "react";
import styleSidebar from '@/styles/Sidebar.module.css';
import stylesButton from '@/styles/Buttons.module.css';

interface NoteListProps {
  notes: string[];
}

const NoteList: React.FC<NoteListProps> = ({ notes }) => {
  return (
      <div>
          {notes.length > 0 && <h2 className={styleSidebar.sidebarTextNotes}>My Notes:</h2>}
          <ul className={stylesButton.note_list}>
            {notes.map((note) => (
              <li key={note} className={stylesButton.notes_btn}>{note}</li>
            ))}
          </ul>
      </div>
    );
  };

export default NoteList;
