import { HeaderPatient } from '../components/header/header';
import { useRouter } from 'next/router';
import { SingleScan as Scan } from '../components/scan_gallery/scan_individual_overview';
import { SidebarPatient } from '@/components/header/sidebar';
import styles from '@/styles/PatientPage.module.scss';
import { FC } from 'react';
import Head from 'next/head';
import scanpicture from '../../../public/3d-teeth.jpg';
import ReactSnackBar from "react-js-snackbar";
import Image from "next/image"

import vrImage from "../../public/VR_icon.png"

import { useQuery } from '@tanstack/react-query';
import { getAllScans } from '@/gen/proto/threedoclusion/v1/service-ScanService_connectquery';
import { useEffect, useState } from 'react';
import { SubscribeConnectionRequest, SubscribeConnectionResponse } from "@/gen/proto/threedoclusion/v1/service_pb";


interface scanData {
  id: number;
  createdAt: string;
  notes: string;
  patientId: number;
}


export default function ScanPage(this: any) {
  let DentistID = process.env.REACT_APP_DENTIST_ID!;
  let targetpatientID = process.env.REACT_APP_PATIENT_ID!;
  const [stream, setStream] = useState<AsyncIterable<SubscribeConnectionResponse> | null>(null);
  const [showSnackbar, setShowSnackbar] = useState<undefined | string>(undefined)

  const { data, refetch } = useQuery(getAllScans.useQuery({ enabled: true }));

  async function checkConnected(serverStream: AsyncIterable<SubscribeConnectionResponse>) {
    for await (const res of serverStream) {
      if (res.isConnected) {
        const message = "VR has connected!"
        console.info(message)
        setShowSnackbar(message)
      }

      else {
        const message = "VR has disconnected!"
        console.info(message)
        setShowSnackbar(message)
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setShowSnackbar(undefined)
    }, 2000);
  }, [showSnackbar])

  if (stream != null) {
    checkConnected(stream);
  }


  useEffect(() => {
    return () => {
      // cleanup function to cancel subscription
      data && refetch();
    };
  }, []);

  const iterateScans = (scan: scanData) => {
    return <Scan scanid={scan.id} date={scan.createdAt} notes={scan.notes} patientid={scan.patientId} setStream={setStream} />;
  };

  const allScans = () => {
    let arrayScans: JSX.Element[] = [];

    if (data && data.scans) {
      data.scans.forEach((scan) => {
        if (scan.patientId == parseInt(targetpatientID)) {
          arrayScans.push(iterateScans(scan));
        }
      });
    }
    return arrayScans;
  };

  return (
    <>
      <Head>
        <title>relu</title>
        <link rel="icon" href="/relu_icon.ico" />
      </Head>

      <div className={styles.white_background}>
        <div className={styles.scansWrapper}>
          {allScans()} <div className={styles.patientScan_filler}></div>
          <div className={styles.patientScan_filler}></div>
          <div className={styles.patientScan_filler}></div>
          <div className={styles.patientScan_filler}></div>
          <div className={styles.patientScan_filler}></div>
          <div className={styles.patientScan_filler}></div>
          <div className={styles.patientScan_filler}></div>
          <div className={styles.patientScan_filler}></div>
          <div className={styles.patientScan_filler}></div>
          <div className={styles.patientScan_filler}></div>
          <div className={styles.patientScan_filler}></div>
        </div>
        <SidebarPatient />
        <HeaderPatient />

        <ReactSnackBar Icon={<Image src={vrImage} width={25} height={25} alt="vr logo" />} Show={showSnackbar}>
          {showSnackbar}
        </ReactSnackBar>
      </div>
    </>
  );
}
