import { useRouter } from 'next/router';
import stylesButton from '@/styles/Buttons.module.css';
import stylesText from '@/styles/Header.module.css';

export default function Settings() {
  const router = useRouter();
  const home = () => router.push('/patient');
  return (
    <>
      <div>
        <p className={stylesText.settingsTitle}>settings</p>
        <div className={stylesText.settingsCodeWrapper}>
          <p className={stylesText.settingsCode}> code </p>
        </div>
        <p className={stylesText.settingsText}>Fill in this code in your VR-headset to connect it to the computer</p>
        <div className={stylesText.settingsButtons}>
          <button type="button" className={stylesButton.relu_btn} id={stylesButton.homeIcon} onClick={home}></button>
          <button type="button" className={stylesButton.relu_btn} id={stylesButton.loadingIconSettings}></button>
        </div>
      </div>
      {/* should reset the code for VR */}
    </>
  );
}
