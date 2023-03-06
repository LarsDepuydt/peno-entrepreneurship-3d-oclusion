import Patientblok from '@/components/Patient';
import gebit1 from '../../public/Gebit1.png'; 

export default function Gallery(){
    return (
        <>
        <Patientblok gebit={gebit1} patientname='Jos'/>
        <Patientblok gebit={gebit1} patientname='Jos'/>
        <Patientblok gebit={gebit1} patientname='Jos'/>
        </>
    )

}