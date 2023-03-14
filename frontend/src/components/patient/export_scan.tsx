import { Formik, Field, Form} from 'formik';
import download from 'downloadjs';
import { useRouter } from 'next/router';
import Image from 'next/image'
import styles from '@/styles/LoginForm.module.css'
import 'bootstrap/dist/css/bootstrap.css'

function handleDownloadClick() {
    const fileUrl = '/lowerjaw_holger.obj';
    download(fileUrl, 'lowerjaw_holger.obj');
  }
  
  function App() {
    return (
      <div>
        <button onClick={handleDownloadClick}>Download Large File</button>
      </div>
    );
  }

export default function LoginForm() {   


    const router = useRouter();


    return (
        <>

        <button type="button" className="btn btn-primary btn-large" onClick={handleDownloadClick} >download</button>
        </>

    );
  };