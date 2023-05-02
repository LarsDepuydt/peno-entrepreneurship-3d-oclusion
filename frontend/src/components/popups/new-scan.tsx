import React, { useState, MouseEvent, ChangeEvent, useEffect, useRef } from 'react';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';

import styles from '@/styles/Modal.module.css';
import styleB from '@/styles/Buttons.module.css';
import { useQuery } from '@tanstack/react-query';
import { addScan } from '@/gen/proto/threedoclusion/v1/service-ScanService_connectquery';

// TODO add files + tags

interface scanValues {
  // type_overbite: boolean;
  // type_underbite: boolean;
  // type_crossbite: boolean;

  // type_reconstructive: boolean;
  // type_jawsurgery: boolean;

  notes: string;
  file: string;
}

export default function ModalForm() {
  //let DentistID = process.env.REACT_APP_DENTIST_ID!;
  let PatientID = process.env.REACT_APP_PATIENT_ID!;

  console.log(PatientID);

  //  file handlers
  const onFileUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('From onFileUploadChange');
  };

  const [modal, setModal] = useState(false);
  // modal is not open at first

  const [submitOK, setSubmitOK] = useState(false);
  const [sendOK, setSendOK] = useState(false);

  const fileRef = useRef(null);

  const [scaninfo, setData] = useState({
    file: '',
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
    setSendOK(true);
  };

  const ReworkValues = (values: scanValues) => {
    return {
      file: values.file,
      notes: values.notes,

      patientId: parseInt(PatientID),
    };
  };

  const submitFunction = (values: scanValues) => {
    console.log(sendOK);

    if (sendOK && modal) {
      setSendOK(false);
      console.log('we started the function submitFunction()');

      setData(ReworkValues(values));
      console.log(scaninfo);

      //console.log(data);
      setSubmitOK(true);
      console.log('submitOK is set to true');
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
      console.log('were in the useEffect function inside the submitOK');
      console.log(scaninfo);
      console.log('line 82');
      if (data != undefined) {
        setModal(false);
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
                          <input className="block w-0 h-0" name="file" type="file" onChange={onFileUploadChange} />
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
