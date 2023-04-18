import { Formik, Field, Form } from 'formik';
// most popular open source form library

import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '@/styles/LoginForm.module.css';
import styleB from '@/styles/Buttons.module.css';

import reluLogo from '../../../public/relu-logo-small.png';


export type Values = {
  username: string;
}

export default function LoginForm({ afterSubmit }: { afterSubmit: (values: Values) => void }) {
  const router = useRouter();

  const toRegister = () => router.push('/register-page');

  return (
    <div className={styles.login_box + ' p-3'}>
      <Image className={styles.small_logo_log} src={reluLogo} alt="relu logo" />

      <Formik
        initialValues={{
          username: '',
        }}
        onSubmit={(values, { setSubmitting }) => {
          afterSubmit(values);
          setSubmitting(false);
        }}
      >
        <Form>
          <div className="mb-3">
            <Field
              className="form-control"
              id="username"
              name="username"
              placeholder="User token"
              aria-describedby="usernameHelp"
            />
          </div>

          <div className={styles.spacingbtn}>
            <button type="submit" className={styleB.relu_btn}>
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}