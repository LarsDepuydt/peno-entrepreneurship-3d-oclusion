import { Formik, Field, Form, FormikHelpers } from 'formik';
// most popular open source form library

import { useRouter } from 'next/router';
import styles from './login-form.module.css'



interface Values {
    username: string;
    password: string;
}

export default function LoginForm() {

    const router = useRouter();

    return (
      <div className={styles.login_box + ' p-3'}>
        <h1 className="display-6 mb-3">Login</h1>
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}

          onSubmit={(
            values: Values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {
            // setTimeout(() => {
            //   alert(JSON.stringify(values, null, 2));
            //   setSubmitting(false);
            // }, 500);
            

            router.push('/page2')
          }}

        >
          <Form>
            <div className="mb-3">
              <Field className="form-control" id="username" name="username" placeholder="Username" aria-describedby="usernameHelp" />
            </div>
  
            <div className="mb-3">
              <Field className="form-control" id="password" name="password" placeholder="Password" type="password" />
            </div>

            <button type="submit" className="btn btn-primary">Login</button>
          </Form>
        </Formik>
      </div>
    );
  };