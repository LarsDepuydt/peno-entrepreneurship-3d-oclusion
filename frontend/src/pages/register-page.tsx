import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';

import RegisterForm from '../components/login/register-form'
import styleL from '@/styles/LandingPage.module.css'

import Image_L from "../../public/landing-image.png";


const inter = Inter({ subsets: ['latin'] });

export default function Register() {
  return (
    <>
      <div className={styleL.all_landing}>

      <div className={styleL.imgbox}>
      <Image className={styleL.image_left} src={Image_L} alt="relu logo"/>
      </div>

      <div className={styleL.loginbox}>
      <RegisterForm />
      </div>

      </div>
    </>
  );
}
