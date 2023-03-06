import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

import LoginForm from '../components/login/login-form'

// import "../styles/globals.css";
// import type { AppProps } from "next/app";


const inter = Inter({ subsets: ['latin'] })

export default function Login() {
  return (
    <>
      <main className="vh-100 d-flex justify-content-center align-items-center">
        <LoginForm />
      </main>
    </>
  )
}