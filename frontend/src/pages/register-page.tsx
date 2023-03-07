import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

import RegisterForm from '../components/login/register-form'

const inter = Inter({ subsets: ['latin'] })

export default function Register() {
  return (
    <>
      <main className="vh-100 d-flex justify-content-center align-items-center">
        <RegisterForm />
      </main>
    </>
  )
}