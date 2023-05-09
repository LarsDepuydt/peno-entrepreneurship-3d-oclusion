import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import styleL from '@/styles/LandingPage.module.css';
import Image_L from '../../public/landing-image.png';
import styleB from '@/styles/Buttons.module.css';

import LoginPage from './login-page';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });
// import dotenv from 'dotenv';
// dotenv.config();

export default function Home() {
  const router = useRouter();

  const toWait = () => {
    router.push('/wait');
  };

  const tostartVR = () => {
    router.push('/start-vr');
  };

  return (
    <>
      <Head>
        <title>relu</title>
        <link rel="icon" href="/relu_icon.ico" />
      </Head>

      <div className={styleL.all_landing}>
        <div className={styleL.imgbox}>
          <Image className={styleL.image_left} src={Image_L} alt="relu logo" />
        </div>

        <div className={styleL.loginbox}>
          <div className={styleB.VRbutton}>
            <button type="submit" className={styleB.VRbuttons} onClick={toWait}>
              Go to Wait
            </button>
            <button type="submit" className={styleB.VRbuttons} onClick={tostartVR}>
              Go to Start-VR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
