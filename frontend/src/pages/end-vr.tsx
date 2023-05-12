import Link from 'next/link';
import styleB from '@/styles/Buttons.module.css';
import styleVR from '@/styles/EndVR.module.css';
import stylesText from '@/styles/Header.module.css';
import reluLogo from '../../public/relu-logo-small.png';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function EndVRPage() {
  // Redirected to on VR side when session has ended
  const router = useRouter();
  const home = () => router.push('/wait');
  return (
    <div>
      <Image className={stylesText.small_logo_log} src={reluLogo} alt="relu logo" />
      <div className={styleVR.massageWrapper}>
        <div className={styleVR.text1}>The scan has been saved successfully.</div>
        <div className={styleVR.text2}>You can now exit safely by closing the window.</div>
        <button className={styleVR.button} id={styleB.homeIcon} onClick={home}></button>
      </div>
    </div>
  );
}
