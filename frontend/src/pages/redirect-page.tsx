import React from 'react';
import ReactLoading from 'react-loading';
import Head from 'next/head';
import LogoutButton from '../components/login/relogin-button';
import styles from '@/styles/WaitPage.module.css';

import Image from 'next/image';
import reluLogo from '../../public/relu-logo-small.png';

import style from '@/styles/Session.module.css';

//<ReactLoading type="spinningBubbles" color="#0000FF" height={100} width={50} />;

export default function Redirect() {
  process.env.REACT_APP_DENTIST_ID = undefined;
  process.env.REACT_APP_PATIENT_ID = undefined;
  return (
    <>
      <Head>
        <title>relu</title>
        <link rel="icon" href="/relu_icon.ico" />
      </Head>

      {/* <ReactLoading className={style.loader} type="spinningBubbles" color="#fe7d00" height={200} width={100} /> */}
      <div className={style.loader}>
        <Image className={styles.small_logo_log} src={reluLogo} alt="relu logo" />
        <div className={styles.loading}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
      </div>
      <div className={style.message}>
        <h2 className={style.text1}> Your session has expired. </h2>
        <h3 className={style.text2}> Please return to the login page to confirm your identity.</h3>
        <div className={style.button}>
          <LogoutButton />
        </div>
      </div>
    </>
  );
}
