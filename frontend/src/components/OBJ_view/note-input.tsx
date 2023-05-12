import React, { useState } from 'react';
import styleSidebar from '@/styles/Sidebar.module.css';
import stylesButton from '@/styles/Buttons.module.css';

interface NoteInputProps {
  onAddNote: (note: string) => void;
}

const NoteInput: React.FC<NoteInputProps> = ({ onAddNote }) => {
  const [note, setNote] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && note) {
      onAddNote(note);
      setNote('');
    }
  };

  return (
    <input
      className={stylesButton.note_input}
      type="text"
      value={note}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder="Add a note..."
    />
  );
};

export default NoteInput;
