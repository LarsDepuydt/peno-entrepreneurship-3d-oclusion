
import Welcome_Doctor from './welcoming'
import Welcoming from './welcoming'
import Logout_Button from './logout-button'
import Image from 'next/image'

import styles from '@/styles/Header.module.css'
import reluLogo from "../../../public/relu-logo-small.png";


export default function Header() {

    return (
      <>
      <div className={styles.header_layout}>
      <Image className={styles.small_logo} src={reluLogo} alt="relu logo"/>
      <Welcoming doctorfirstname={"Anna"} doctorlastname={"Proost"}/>
      <div className = {styles.logout_layout}><Logout_Button/></div>
      </div>
      </>
    ) 
  }