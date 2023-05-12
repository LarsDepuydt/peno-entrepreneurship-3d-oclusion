import Link from 'next/link';
import styleB from '@/styles/Buttons.module.css';
import styleVR from '@/styles/EndVR.module.css';
import stylesText from '@/styles/Header.module.css';
import reluLogo from '../../public/relu-logo-small.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
//import { useHistory } from "react-router-dom";

export default function EndVRPage() {
  // Redirected to on VR side when session has ended
  const router = useRouter();
  const home = () => router.push('/wait');

  const [timeLeft, setTimeLeft] = useState(10); // initial countdown time
  // const history = useHistory(); // hook to access the router history

  useEffect(() => {
    if (timeLeft === 0) {
      // redirect to another page after 10 seconds
      router.push('/wait');
    } else {
      // decrement timeLeft every second
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId); // clear timer on component unmount
    }
  }, [timeLeft]);

  return (
    <div>
      <Image className={stylesText.small_logo_log} src={reluLogo} alt="relu logo" />
      <div className={styleVR.massageWrapper}>
        <div className={styleVR.text1}>The scan has been saved successfully.</div>
        <div className={styleVR.text2}>You can now exit safely by closing the window.</div>
        <div className="countdown">
          <h1 className={styleVR.text3}>Redirecting you automatically in {timeLeft} seconds</h1>
        </div>
        <button className={styleVR.button} id={styleB.homeIcon} onClick={home}></button>
      </div>
    </div>
  );
}
