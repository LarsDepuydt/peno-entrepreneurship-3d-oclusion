import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';

//import StartPage from './login-page';
import StartPage from './vr-bypass';

const inter = Inter({ subsets: ['latin'] });
// import dotenv from 'dotenv';
// dotenv.config();

export default function Home() {
  return (
    <>
      <Head>
        <title>relu</title>
        <link rel="icon" href="/relu_icon.ico" />
      </Head>
      <main className="vh-100 d-flex justify-content-center align-items-center">
        <StartPage />
      </main>

    </>
  );
}
