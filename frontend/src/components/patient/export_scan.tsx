import { Formik, Field, Form} from 'formik';
import {saveAs} from 'file-saver'
import { useRouter } from 'next/router';
import Image from 'next/image'
import styles from '@/styles/LoginForm.module.css'
import 'bootstrap/dist/css/bootstrap.css'


import reluLogo from "../../../public/relu-logo-small.png";

export default function LoginForm() {   


    const router = useRouter();

    const exportScan = () => {
        saveAs('../../../public/relu-logo-small.png', 'name of exported file');
    }

    return (
        <>

        <button type="button" className="btn btn-primary btn-large" onClick={exportScan} >download</button>
        </>

    );
  };