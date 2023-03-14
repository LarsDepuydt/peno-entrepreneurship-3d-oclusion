import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'

import styleL from '@/styles/LandingPage.module.css'
import LoginForm from '../components/login/login-form'
import Image_L from "../../public/landing-image.png";


const inter = Inter({ subsets: ['latin'] })

export default function LandingPage() {
  return (
    <>
      
      <div className={styleL.all_landing}>

        <div className={styleL.imgbox}>
        <Image className={styleL.image_left} src={Image_L} alt="relu logo"/>
        </div>

        <div className={styleL.loginbox}>
        <LoginForm />
        </div>

    </div>
      
    </>
  )
}