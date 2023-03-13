import { useRouter } from 'next/router';

export default function LogoutButton() { 

    const clickLogout = () => {
        router.push('/login-page')    // change state f -> t and t -> f
    }

    const router = useRouter();

    return (
    <>
    <button type="button" className= "btn btn-outline-secondary btn-large" onClick={clickLogout} >Log out</button>
    </> )
  }