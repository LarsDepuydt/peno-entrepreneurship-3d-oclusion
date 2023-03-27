import { Formik, Field, Form } from 'formik';
// most popular open source form library
import * as yup from 'yup';

import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '@/styles/LoginForm.module.css';
import styleB from '@/styles/Buttons.module.css';

import reluLogo from '../../../public/relu-logo-small.png';
//import bcrypt from 'bcryptjs';

import { useQuery } from '@tanstack/react-query';
import { register } from '@/gen/proto/threedoclusion/v1/service-ScanService_connectquery';

const FormSchema = yup.object().shape({
  reppassword: yup.string().oneOf([yup.ref('password')], 'this does not match your password'),
});

interface Values {
  doctorFirstName: string;
  doctorLastName: string;

  email: string;
  password: string;
  reppassword: string;
}

export default function LoginForm() {
  const router = useRouter();

  const toLogin = () => router.push('/login-page');

  return (
    <div className={styles.login_box + ' p-3'}>
      <Image className={styles.small_logo_reg} src={reluLogo} alt="relu logo" />

      <Formik
        initialValues={{
          doctorFirstName: '',
          doctorLastName: '',

          email: '',
          password: '',
          reppassword: '',
        }}
        validationSchema={FormSchema}
        onSubmit={(values) => {
          const { data } = useQuery(
            register.useQuery({
              email: values.email,
              password: values.password,
              firstName: values.doctorFirstName,
              lastName: values.doctorLastName,
            })
          );
          console.log(data && data.message);
          router.push('/patient');
        }}
      >
        {({ errors }) => (
          <Form className={styles.center}>
            <div className={styles.firstandlast}>
              <div className="mb-3">
                <Field
                  className="form-control"
                  id="doctorFirstName"
                  name="doctorFirstName"
                  placeholder="First Name"
                  aria-describedby="doctorFirstNameHelp"
                />
              </div>

              <div className="mb-3">
                <Field
                  className="form-control"
                  id="doctorLastName"
                  name="doctorLastName"
                  placeholder="Last Name"
                  aria-describedby="doctorLastNameHelp"
                />
              </div>
            </div>

            <div className="mb-3">
              <Field
                className="form-control"
                id="email"
                name="email"
                placeholder="Email"
                aria-describedby="emailHelp"
              />
            </div>

            <div className="mb-3">
              <Field
                className="form-control"
                validate
                id="password"
                name="password"
                placeholder="Password"
                type="password"
              />
            </div>

            <div className="mb-3">
              <Field
                className="form-control"
                validation
                id="reppassword"
                name="reppassword"
                placeholder="Repeat Password"
                type="password"
              />
              {errors.reppassword && <b className={styles.error}>{errors.reppassword}</b>}
            </div>

            <div className={styles.spacingbtn}>
              <button type="submit" className={styleB.relu_btn}>
                Register
              </button>
              <button type="button" className={styleB.relu_btn} onClick={toLogin}>
                Login instead
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
