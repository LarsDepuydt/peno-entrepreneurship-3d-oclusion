import { Formik, Field, Form} from 'formik';
// most popular open source form library

import { useRouter } from 'next/router';
import Image from 'next/image'
import styles from '@/styles/LoginForm.module.css'
import 'bootstrap/dist/css/bootstrap.css'


import reluLogo from "../../../public/relu-logo-small.png";



interface Values {
    username: string;
    password: string;
}

export default function LoginForm() {   


    const router = useRouter();

    const toRegister = () => router.push('/register-page');

    return (
      <div className={styles.login_box + ' p-3'}>
        <Image className={styles.small_logo} src={reluLogo} alt="relu logo"/>

        

        <Formik
          initialValues={{
            username: '',
            password: '',
          }}

          onSubmit={() => {router.push('/patient')}}

      
        >
          <Form>
            <div className="mb-3">
              <Field className="form-control" id="username" name="username" placeholder="Username" aria-describedby="usernameHelp" />
            </div>
  
            <div className="mb-3">
              <Field className="form-control" id="password" name="password" placeholder="Password" type="password" />
            </div>
            
            <div className ={styles.spacingbtn}>
            <button type="submit" className="btn btn-primary btn-large" >Login</button>
            <button type="button" className= "btn btn-primary btn-large" onClick={toRegister} >Register instead</button>
            </div>
          </Form>
        </Formik>
      </div>
    );
  };