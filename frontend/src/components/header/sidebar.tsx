import React from 'react';
import styles from '@/styles/Header.module.css';
import New_Patient from '../popups/new-patient';
import New_Scan from '../popups/new-scan';

function Sidebar() {
  return (
    <>
      <div className={styles.sidebar}>
        {/* <New_Patient /> */}
        <New_Scan />
      </div>
    </>
  );
}

export default Sidebar;
