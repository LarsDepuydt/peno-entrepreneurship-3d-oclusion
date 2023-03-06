import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.css'
import React from "react";
import Image from 'next/image'
import gebit from '../../public/Gebit1.png'; 
import { string } from 'yup';


console.log(gebit); // 

function Photo({url}) {
  return <Image src={url} alt="photo_of_teeth" width={300}/>;
}

function PatientName({patientname}){
  return <p> {patientname} </p>
}

interface Props {
  gebit: string
  patientname: string
}

export default function Patientblok({gebit, patientname}: Props){
  return(
  <>
  <Photo url={gebit}/>
  <PatientName patientname={patientname}/>
  </>
  )
}

