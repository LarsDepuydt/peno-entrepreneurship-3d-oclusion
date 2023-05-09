import { HeaderPatient } from '../components/header/header';
import { useRouter } from 'next/router';
import { SingleScan as Scan } from '../components/scan_gallery/scan_individual_overview';
import { SidebarPatient } from '@/components/header/sidebar';
import styles from '@/styles/PatientPage.module.scss';
import { FC } from 'react';
import Head from 'next/head';
import scanpicture from '../../../public/3d-teeth.jpg';

import { useQuery } from '@tanstack/react-query';
import { getAllScans } from '@/gen/proto/threedoclusion/v1/service-ScanService_connectquery';
import { useEffect } from 'react';

interface scanData {
  id: number;
  createdAt: string;
  notes: string;
  patientId: number;
}

export default function ScanPage(this: any) {
  let DentistID = process.env.REACT_APP_DENTIST_ID!;
  let targetpatientID = process.env.REACT_APP_PATIENT_ID!;

  const { data, refetch } = useQuery(getAllScans.useQuery({ enabled: true }));
  console.log(data);
  useEffect(() => {
    return () => {
      // cleanup function to cancel subscription
      data && refetch();
      console.log('cleanup');
    };
  }, [data]);

  const iterateScans = (scan: scanData) => {
    return <Scan scanid={scan.id} date={scan.createdAt} notes={scan.notes} patientid={scan.patientId} />;
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

      <div>
        <div className={styles.scansWrapper}>{allScans()}</div>
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
        <div className={styles.patientScan_filler}></div>
        <SidebarPatient />
        <HeaderPatient />
      </div>
    </>
  );
}
