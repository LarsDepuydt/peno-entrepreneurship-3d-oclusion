import React from 'react';
import styles from '@/styles/Header.module.css'
import New_Patient from '../popups/new-patient';

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      {/* Sidebar content goes here: filter, search, contact, link to relu-page, ... */
        <New_Patient />
      }
    </div>
  );
}

export default Sidebar;