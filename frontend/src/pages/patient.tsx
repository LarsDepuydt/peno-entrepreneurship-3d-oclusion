import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.css'

import Header from '../components/header/header'
import AddNew_Patient from '../components/popups/new-patient'
import PatientGallery_Temp from '../components/image-button'

export default function PatientPage({ Component, pageProps }: AppProps) {
  return (
    <>
    <Header/>
    <PatientGallery_Temp/>
    <AddNew_Patient/>
    </>
  ) 
}