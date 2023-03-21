import { WelcomingDoctor, WelcomingPatient } from './welcoming';
import Logout_Button from './logout-button';
import Image from 'next/image';

import styles from '@/styles/Header.module.css';
import reluLogo from '../../../public/relu-logo-small.png';

interface HeaderPatientProps {
  patientfirstname: string;
  patientlastname: string;
}

export function HeaderDoctor() {
  return (
    <>
      <div className={styles.header_layout}>
        <Image className={styles.small_logo} src={reluLogo} alt="relu logo" />
        <WelcomingDoctor doctorfirstname={'Anna'} doctorlastname={'Proost'} />
        <div className={styles.logout_layout}>
          <Logout_Button />
        </div>
      </div>
    </>
  );
}

export function HeaderPatient({ patientfirstname, patientlastname }: HeaderPatientProps) {
  return (
    <>
      <div className={styles.header_layout}>
        <Image className={styles.small_logo} src={reluLogo} alt="relu logo" />
        <WelcomingPatient
          patientfirstname={patientfirstname}
          patientlastname={patientlastname}
          doctorfirstname={'Anna'}
          doctorlastname={'Proost'}
        />
        <div className={styles.logout_layout}>
          <Logout_Button />
        </div>
      </div>
    </>
  );
}
