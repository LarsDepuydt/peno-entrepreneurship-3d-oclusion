import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.css'

import New_Patient from '../components/popups/new-patient'
import Patient1 from '../components/image-button'

export default function PatientPage({ Component, pageProps }: AppProps) {
  return (
    <>
    <Patient1/>
    <New_Patient/>
    </>
  ) 
}