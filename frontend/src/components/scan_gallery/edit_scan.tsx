import {
  getScanById,
  getAllScans,
  updateScanById,
} from '@/gen/proto/threedoclusion/v1/service-ScanService_connectquery';
import { queryClient } from '@/pages/_app';
import styleB from '@/styles/Buttons.module.css';
import styles from '@/styles/Modal.module.css';
import styleP from '@/styles/PatientPage.module.scss';
import { useQuery } from '@tanstack/react-query';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';

import { useEffect, useState } from 'react';

interface scanValues {
  notes: string;
}

export default function EditScanButton({ scanID }: { scanID: number }) {
  let DentistID = process.env.REACT_APP_DENTIST_ID!;
  let PatientID = process.env.REACT_APP_PATIENT_ID!;

  const [modal, setModal] = useState(false);
  const [submitOK, setSubmitOK] = useState(false);
  const [sendOK, setSendOK] = useState(false);

  const query = getScanById.useQuery({ id: scanID });
  const { data: scanInfoRequest, refetch: refetchScan } = useQuery(query.queryKey, query.queryFn, {
    enabled: false,
  });

  const toggleModal = () => {
    console.log('modal is set');
    setModal(!modal); // change state f -> t and t -> f
    setSendOK(true);
    refetchScan();
  };

  // const date = new Date();
  // let day = date.getDate();
  // let month = date.getMonth() + 1;
  // let year = date.getFullYear();
  // let currentDate = `${day}-${month}-${year}`;

  const handleRedirect = () => {
    refetch();
    if (submitOK) {
      setSendOK(true);
    }
  };

  const [scaninfo, setData] = useState({
    id: scanID,

    scanFile: 'gs://relu-vr-scan-database.appspot.com/Patiënt-Scans/Patient-1/upper_ios_6.obj',
    notes: ' | ',

    patientId: parseInt(PatientID),
  });

  const ReworkInfo = (values) => {
    return {
      id: scanID,
      scanFile: 'gs://relu-vr-scan-database.appspot.com/Patiënt-Scans/Patient-1/upper_ios_6.obj',
      notes: values.notes,

      patientId: parseInt(PatientID),
    };
  };

  useEffect(() => {
    modal && refetchScan();
    modal && console.log(scanInfoRequest);
    modal && console.log('inRefetchUseEffect');

    if (modal && scanInfoRequest != undefined) {
      setData(ReworkInfo(scanInfoRequest));
    }
  }, [modal]);

  useEffect(() => {
    modal && console.log('this is the scaninfo ');
    modal && scaninfo.notes != '' && console.log(scaninfo);
  }, [modal, scaninfo]);

  const refreshKey = getAllScans.useQuery().queryKey;
  const { data, refetch } = useQuery(
    updateScanById.useQuery(scaninfo).queryKey,
    updateScanById.useQuery(scaninfo).queryFn,
    {
      enabled: false,
      onSuccess: () => queryClient.refetchQueries(refreshKey),
    }
  );

  const ReworkValues = (values: scanValues) => {
    return {
      id: scanID,
      scanFile: 'gs://relu-vr-scan-database.appspot.com/Patiënt-Scans/Patient-1/upper_ios_6.obj',

      notes: values.notes + ' | ',

      patientId: parseInt(PatientID),
    };
  };

  const submitFunction = (values: scanValues) => {
    if (sendOK && modal) {
      setSendOK(false);
      console.log('we are in the updatepatient update function');

      setData(ReworkValues(values));
      console.log(scaninfo);

      setSubmitOK(true);
      console.log('submitOK is set to true');
    }

    setModal(false);
  };

  useEffect(() => {
    if (submitOK) {
      console.log('in updatepatient useeffect');
      refetch();
      console.log('were in the useEffect function inside the submitOK');
      console.log(scaninfo);
      if (data != undefined) {
        setModal(false);
      }
      setSubmitOK(false);
    }
  }, [data, modal, sendOK, submitOK, refetch]);

  return (
    <>
      {/* <div className={styleP.dropDownButtonEdit}> */}
      {/* <button type="button" className={styleB.relu_btn} id={styleB.editIcon}  /> */}
      <button className={styleB.relu_btn} id={styleB.dropDownButton} onClick={toggleModal}>
        edit scan
      </button>
      {/* </div> */}

      {modal && (
        <div className={styles.modal}>
          <div className={styles.overlay}></div>
          <div className={styles.modal_content}>
            <div className={styles.login_box + ' p-3'}>
              <Formik
                initialValues={{
                  notes: scanInfoRequest?.notes,
                }}
                onSubmit={submitFunction}
              >
                {({ errors, status, touched }) => (
                  <Form>
                    <div className="mb-3">
                      <Field
                        className="form-control"
                        id="notes"
                        name="notes"
                        placeholder="Additional notes"
                        type="notes"
                      />
                    </div>

                    <div className={styles.spacingbtn}>
                      <button type="submit" className={styleB.relu_btn} onClick={handleRedirect}>
                        Edit scan
                      </button>
                      <button type="button" className={styleB.relu_btn} onClick={toggleModal}>
                        Exit
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
