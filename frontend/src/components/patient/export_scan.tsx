import { Formik, Field, Form} from 'formik';
import {saveAs} from 'file-saver'
import { useRouter } from 'next/router';
import Image from 'next/image'
import styles from '@/styles/LoginForm.module.css'
import 'bootstrap/dist/css/bootstrap.css'

/**https://www.youtube.com/watch?v=CJvHc49kY2E */

export default function LoginForm() {   


    const router = useRouter();

    const exportScan = () => {
        saveAs("/relu-logo-small.png", 'relu-logo-small.png');
    }

    return (
        <>

        <button type="button" className="btn btn-primary btn-large" onClick={exportScan} >download</button>
        </>

    );
  };