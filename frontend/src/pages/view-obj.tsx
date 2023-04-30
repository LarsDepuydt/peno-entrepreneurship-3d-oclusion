import { HeaderObj } from '../components/header/header';
import { SidebarObj } from '@/components/header/sidebar';
import { FC } from 'react';
import { useRouter } from 'next/router';
import ObjDisplay from '../components/OBJ_view/obj-display'


function App() {

    const router = useRouter();
    const targetpatientID = router.query.patientID as string;
    const targetscanID = router.query.scanID as string;

    return (
      <div>
        <SidebarObj/>
        <HeaderObj />
        <ObjDisplay />
      </div>
      );

}

export default App;



