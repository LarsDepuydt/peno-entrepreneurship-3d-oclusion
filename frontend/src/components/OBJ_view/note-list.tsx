import React from "react";
import styleSidebar from '@/styles/Sidebar.module.css';
import stylesButton from '@/styles/Buttons.module.css';


const NoteList = ({notes} : {notes : string} )  => {

  const temp = notes.split('@.')

  const notesarray = temp.filter((str) => str !== '');

  

  return (
      <div>
          {notes.length > 0 && <h2 className={styleSidebar.sidebarTextNotes}>My Notes:</h2>}
          <ul className={stylesButton.note_list}>
            {notesarray.map((note) => (
              <li key={note} className={stylesButton.notes_btn}>{note}</li>
            ))}
          </ul>
      </div>
    );
  };

export default NoteList;
