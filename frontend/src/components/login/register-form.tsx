import { Formik, Field, Form} from 'formik';
// most popular open source form library
import * as yup from 'yup';

import { useRouter } from 'next/router';
import Image from 'next/image'
import styles from '@/styles/LoginForm.module.css'


import reluLogo from "../../../public/relu-logo-small.png";


const FormSchema = yup.object().shape({
  reppassword: yup
    .string()
    .oneOf([yup.ref('password')], 'this does not match your password'),
});


interface Values {
    username: string;
    password: string;
    reppassword: string;
}

export default function LoginForm() {   

  

    const router = useRouter();

    const toLogin = () => router.push('/login-page')    

    return (
      <div className={styles.login_box + ' p-3'}>
        <Image className={styles.small_logo} src={reluLogo} alt="relu logo"/>

        

        <Formik
          initialValues={{
            username: '',
            password: '',
            reppassword: '',
          }}


          validationSchema={FormSchema}

          onSubmit={() => {router.push('/patient')}}

      
        >
          {({ errors }) => (
          <Form className={styles.center}>
            <div className="mb-3">
              <Field className="form-control" id="username" name="username" placeholder="Username" aria-describedby="usernameHelp" />
            </div>
  
            <div className="mb-3">
              <Field className="form-control" validate id="password" name="password" placeholder="Password" type="password" />
            </div>

            <div className="mb-3">
              <Field className="form-control" validation id="reppassword" name="reppassword" placeholder="Repeat Password" type="password" />
              {errors.reppassword && <b className={styles.error}>{errors.reppassword}</b>}
            </div>

            <div className ={styles.spacingbtn}>
            <button type="submit" className= "btn btn-outline-secondary btn-large" >Register</button>
            <button type="button" className= "btn btn-outline-secondary btn-large" onClick={toLogin} >Login instead</button>
            </div>
          </Form>
        )}

        
        </Formik>

      
      </div>
    );
  };