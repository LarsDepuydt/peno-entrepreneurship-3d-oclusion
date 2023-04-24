import { Formik, Field, Form } from 'formik';
// most popular open source form library

import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '@/styles/LoginForm.module.css';
import styleB from '@/styles/Buttons.module.css';

import reluLogo from '../../../public/relu-logo-small.png';
import { useQuery } from '@tanstack/react-query';
import { login } from '@/gen/proto/threedoclusion/v1/service-ScanService_connectquery';
import { useEffect, useState } from 'react';

interface LUser {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [credentials, setData] = useState({ email: '', password: '' });

  const { data } = useQuery(login.useQuery(credentials));

  const router = useRouter();

  const submitFunction = (values: LUser) => {
    console.log(values);
    router.push('/patient');
    //setData(values);
  };

  useEffect(() => {
    data?.token && credentials.email && router.push('/patient');
  }, [data, credentials]);

  const toRegister = () => router.push('/register-page');

  return (
    <div className={styles.login_box + ' p-3'}>
      <Image className={styles.small_logo_log} src={reluLogo} alt="relu logo" />

      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={submitFunction}
      >
        <Form>
          <div className="mb-3">
            <Field
              className="form-control"
              id="email"
              name="email"
              placeholder="Email"
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
