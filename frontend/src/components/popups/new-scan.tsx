import React, { useState, MouseEvent, ChangeEvent, useEffect, useRef } from 'react';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';

import styles from '@/styles/Modal.module.css';
import styleB from '@/styles/Buttons.module.css';
import { useQuery } from '@tanstack/react-query';
import { addScan } from '@/gen/proto/threedoclusion/v1/service-ScanService_connectquery';
import useStorage from '@/hooks/useStorage';

// TODO add files + tags

interface scanValues {
  notes: string;
  file: string;
}

export default function ModalForm() {
  //let DentistID = process.env.REACT_APP_DENTIST_ID!;
  let PatientID = process.env.REACT_APP_PATIENT_ID!;
  const [scan, setScan] = useState<File | null>(null);

  const path = 'gs://relu-vr-scan-database.appspot.com/Patiënt-Scans/Patient-1/upper_ios_6.obj';
  const { handleDownloadClick, loading, error } = useStorage(path);

  //  file handlers
  const onFileUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;

    if (!fileInput.files) {
      alert('No file was chosen');
      return;
    }

    e.preventDefault();
    console.log('From onFileUploadChange');

    const file = fileInput.files[0];
    console.log(file);
    setScan(file);
  };

  const [modal, setModal] = useState(false);
  // modal is not open at first

  const [submitOK, setSubmitOK] = useState(false);
  const [sendOK, setSendOK] = useState(false);

  //const fileRef = useRef(null);

  const [scaninfo, setData] = useState({
    scanFile: path,
    notes: '',

    patientId: parseInt(PatientID),
  });

  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;

  const { data, refetch } = useQuery(addScan.useQuery(scaninfo).queryKey, addScan.useQuery(scaninfo).queryFn, {
    enabled: false,
  });

  const toggleModal = () => {
    setModal(!modal); // change state f -> t and t -> f
    setSendOK(!modal);
    setScan(null);
    setSubmitOK(false);
  };

  const submitFunction = (values: scanValues) => {
    refetch();
    console.log('in submitfunction');

    console.log('this is the scan');
    console.log(scan);

    console.log('this is the OLD scan info');
    console.log(scaninfo);
    console.log(scaninfo.scanFile);

    if (sendOK && modal) {
      setSendOK(false);

      refetch();
      setData(scaninfo);
      //refetch();

      console.log('this is the NEW scan info');
      console.log(scaninfo);

      setSubmitOK(true);
    }

    setModal(false);
  };

  const handleRedirect = () => {
    refetch();
    if (submitOK) {
      setSendOK(true);
    }
  };

  useEffect(() => {
    if (submitOK) {
      refetch();
      console.log('in useEffect');
      console.log('NEW scaninfo file path is ' + scaninfo.scanFile);
      console.log(data);
      if (data != undefined) {
        console.log('data is not undefined loop');
        setModal(false);
        setSubmitOK(false);
      }
      setSubmitOK(false);
    }
  }, [data, modal, submitOK]);

  return (
    <>
      <div className={styles.btn_modal}>
        <button onClick={toggleModal} className={styleB.relu_btn} id={styleB.fixedWidth}>
          Add Scan
        </button>
        {/* translation files bekijken */}
      </div>

      {modal && (
        <div className={styles.modal}>
          <div className={styles.overlay}></div>
          <div className={styles.modal_content}>
            <div className={styles.login_box + ' p-3'}>
              <Formik
                initialValues={{
                  notes: '',
                  file: '',
                }}
                // on Submit we console the values + close the popup tab
                // implicit date = currentDate
                onSubmit={submitFunction}
              >
                {({ errors, status, touched }) => (
                  <Form>
                    <form className="w-full p-3" action="" onSubmit={(e) => e.preventDefault()}>
                      <div>
                        <label>
                          <input className="block w-0 h-0" name="file" type="file" onChange={onFileUploadChange} />{' '}
                        </label>
                      </div>
                    </form>

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
                        Save scan
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
