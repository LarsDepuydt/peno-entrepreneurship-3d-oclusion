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

interface IDprop {
  dentistID: any;
}

export default function LoginForm() {
  const [credentials, setData] = useState({ email: '', password: '' });

  const [submitOK, setSubmitOK] = useState(false);
  const [sendOK, setSendOK] = useState(false);

  //const { data } = useQuery(login.useQuery(credentials));

  const query = login.useQuery(credentials);
  const { data, refetch } = useQuery(query.queryKey, query.queryFn, { enabled: false });

  const router = useRouter();

  const submitFunction = (values: LUser) => {
    console.log(values);
    console.log(' (1) REACT_APP_DENTIST_ID is ' + process.env.REACT_APP_DENTIST_ID);
    setData(values);
    console.log(data);

    setSubmitOK(true);
  };

  const handleRedirect = () => {
    if (submitOK) {
      setSendOK(true);
    }
  };

  useEffect(() => {
    if (submitOK) {
      refetch();
      console.log(data);
      setSendOK(false);
      if (data != undefined) {
        process.env.REACT_APP_DENTIST_ID = data.id.toString();
      }
      data?.token && credentials.email && router.push('/patient');
    }
  }, [data, credentials, router, sendOK, submitOK,refetch]);

  // useEffect(() => {
  //   data?.token && credentials.email && data?.id && router.push('/patient');
  //   //&& router.push({ pathname: '/patient/[dentistID]', query: { dentistID: data.id } });
  //   //&& router.push({ pathname: '/patient/[dentistID]', query: { dentistID: process.env.REACT_APP_DENTIST_ID } });
  // }, [data, credentials, router]);


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
            <button type="submit" className={styleB.relu_btn} onClick={handleRedirect}>
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
