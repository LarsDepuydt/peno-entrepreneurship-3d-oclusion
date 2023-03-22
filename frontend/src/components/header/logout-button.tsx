import { useRouter } from 'next/router';
import styleB from '@/styles/Buttons.module.css'

export default function LogoutButton() { 

    const clickLogout = () => {
        router.push('/login-page')    // change state f -> t and t -> f
    }

    const router = useRouter();

    return (
    <>
    <button type="button" id={styleB.logOut} className={styleB.relu_btn} onClick={clickLogout} >Log out</button>
    </> )
  }