import Logout_Button from './logout-button';
import Image from 'next/image';

import styles from '@/styles/Header.module.css';
import reluLogo from '../../../public/relu-logo-small.png';

export function HeaderDoctor() {
  return (
    <>
      <div className={styles.header_layout}>
        <Image className={styles.small_logo} src={reluLogo} alt="relu logo" />
        <h1 className={styles.bigText}>Patient Overview</h1>
        <div className={styles.logout_layout}>
          <Logout_Button />
        </div>
      </div>
    </>
  );
}

export function HeaderPatient() {
  return (
    <>
      <div className={styles.header_layout}>
        <Image className={styles.small_logo} src={reluLogo} alt="relu logo" />
        <h1 className={styles.bigText}>Scans Overview</h1>
        <div className={styles.logout_layout}>
          <Logout_Button />
        </div>
      </div>
    </>
  );
}
