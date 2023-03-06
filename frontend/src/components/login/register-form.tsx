import { Formik, Field, Form} from 'formik';
// most popular open source form library

import { useRouter } from 'next/router';
import Image from 'next/image'
import styles from '@/styles/LoginForm.module.css'


import reluLogo from "../../../public/relu-logo-small.png";



interface Values {
    username: string;
    password: string;
    reppassword: string;
}

export default function LoginForm() {   


    const router = useRouter();

    const toLogin = () => {
      router.push('/login-page')    
  }

    return (
      <div className={styles.login_box + ' p-3'}>
        <Image className={styles.small_logo} src={reluLogo} alt="relu logo"/>

        

        <Formik
          initialValues={{
            username: '',
            password: '',
            reppassword: '',
          }}

          onSubmit={() => {router.push('/patient-page')}}

      
        >
          <Form>
            <div className="mb-3">
              <Field className="form-control" id="username" name="username" placeholder="Username" aria-describedby="usernameHelp" />
            </div>
  
            <div className="mb-3">
              <Field className="form-control" id="password" name="password" placeholder="Password" type="password" />
            </div>

            <div className="mb-3">
              <Field className="form-control" id="reppassword" name="reppassword" placeholder="Repeat Password" type="password" />
            </div>

            <div className ={styles.redirect}>
            <button type="submit" className= "btn btn-primary btn-large" >Register</button>
            <button type="button" className= "btn btn-primary btn-large" onClick={toLogin} >Login instead</button>
            </div>
          </Form>
        </Formik>

      
      </div>
    );
  };