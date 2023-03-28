import React from 'react';
import styles from '@/styles/Header.module.css';
import New_Patient from '../popups/new-patient';
import New_Scan from '../popups/new-scan';
import Search_Name from '../search/search-name';
import Search_ID from '../search/search-id';
import Filter_Tags from '../search/filter-tags';

function Sidebar() {
  return (
    <>
      <div className={styles.sidebar}>
        {/* <div className={styles.buttons}>
        <New_Patient />
        </div> */}
        <div className={styles.buttons}>
          <Search_Name />
        </div>
        {/* <div className={styles.buttons}>
          <Search_ID />
        </div> */}
        {/* <New_Scan /> */}
        {/* </div> */}
      </div>
    </>
  );
}

export default Sidebar;
