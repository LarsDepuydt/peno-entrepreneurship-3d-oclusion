import React from 'react';
import ReactLoading from 'react-loading';
import Logout_Button from './logout-button';

import styles from '@/styles/Session.module.css';
import styleB from '@/styles/Buttons.module.css';
import { useRouter } from 'next/router';

export default function Loading() {
  const clickLogout = () => {
    router.push('/login-page'); // change state f -> t and t -> f
  };

  const router = useRouter();

  return (
    <div className={styles.endsession}>
      <div className={styles.loader}>
        <ReactLoading type="bubbles" color="#fe7d00" height={200} width={100} />
      </div>
      <div className={styles.message}>
        <h2 className={styles.text1}>Your session has expired</h2>
        <h3 className={styles.text2}>Please login again to validate your identity</h3>
      </div>
      <div className={styles.button}>
        <button type="button" id={styleB.logOut} className={styleB.relu_btn} onClick={clickLogout}>
          Log in
        </button>
      </div>
    </div>
  );
}
