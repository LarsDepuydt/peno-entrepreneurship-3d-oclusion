import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.css'

import Modal from '../components/modals/modal'

export default function App({ Component, pageProps }: AppProps) {
  return <Modal/>
}