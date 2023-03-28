import { Formik, Field, Form } from 'formik';
// most popular open source form library

import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '@/styles/LoginForm.module.css';
import styleB from '@/styles/Buttons.module.css';

import reluLogo from '../../../public/relu-logo-small.png';
import { useMutation, useQuery } from '@tanstack/react-query';
import { login } from '@/gen/proto/threedoclusion/v1/service-ScanService_connectquery';
import axios from 'axios';
import { useState } from 'react';

interface LUser {
  username: string;
  password: string;
}

export default function LoginForm() {
  const [credentials, setData] = useState({ username: '', password: '' });

  const { data } = useMutation(login.useQuery(credentials));

  const router = useRouter();

  function SubmitFunct(input: LUser) {
    console.log('button was clicked x2');

    const gotten = setData(input);
    console.log(gotten);
    router.push('/patient');
  }

  const toRegister = () => router.push('/register-page');

  return (
    <div className={styles.login_box + ' p-3'}>
      <Image className={styles.small_logo_log} src={reluLogo} alt="relu logo" />

      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={(values) => {
          console.log('button was clicked !');
          console.log(values);
          //const gotten = setData(values);
          //console.log(gotten);
          router.push('/patient');
        }}
      >
        <Form>
          <div className="mb-3">
            <Field
              className="form-control"
              id="username"
              name="username"
              placeholder="Username"
              aria-describedby="usernameHelp"
            />
          </div>

          <div className="mb-3">
            <Field className="form-control" id="password" name="password" placeholder="Password" type="password" />
          </div>

          <div className={styles.spacingbtn}>
            <button type="submit" className={styleB.relu_btn}>
              Login
            </button>
            <button type="button" className={styleB.relu_btn} onClick={toRegister}>
              Register instead
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
