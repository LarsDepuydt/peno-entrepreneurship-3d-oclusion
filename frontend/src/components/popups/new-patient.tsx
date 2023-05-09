import { Formik, Field, Form, ErrorMessage } from 'formik';

import styles from '@/styles/Modal.module.css';
import styleB from '@/styles/Buttons.module.css';

import 'bootstrap/dist/css/bootstrap.css';

import { useQuery } from '@tanstack/react-query';
import { addPatient } from '@/gen/proto/threedoclusion/v1/service-ScanService_connectquery';
import { useEffect, useState } from 'react';

interface patientValues {
  patientFirstName: string;
  patientLastName: string;

  pinned: boolean;
  notes: string;
}

export default function ModalForm() {
  let DentistID = process.env.REACT_APP_DENTIST_ID!;

  const [modal, setModal] = useState(false);
  // modal is not toggled at first

  const [submitOK, setSubmitOK] = useState(false);
  const [sendOK, setSendOK] = useState(false);

  const [patientinfo, setData] = useState({

    firstName: '',
    lastName: '',

    pinned: false,
    notes: '',
    dentistId: 0,
  });

  const { data, refetch } = useQuery(
    addPatient.useQuery(patientinfo).queryKey,
    addPatient.useQuery(patientinfo).queryFn,
    { enabled: false }
  );


  const toggleModal = () => {
    setModal(!modal); // change state f -> t and t -> f
    setSendOK(true);
  };

  const ReworkValues = (values: patientValues) => {
    return {
      firstName: values.patientFirstName,
      lastName: values.patientLastName,
      pinned: values.pinned,
      notes: values.notes,

      dentistId: parseInt(DentistID),
    };
  };

  const ReworkValues = (values: patientValues) => {
    return {
      patientFirstName: values.patientFirstName,
      patientLastName: values.patientLastName,
      pinned: values.pinned,
      notes: values.notes,

      // doctorID: parseInt(DentistID),
      doctorID: 64,
    };
  };

  const submitFunction = (values: patientValues) => {

    if (sendOK && modal) {
      setSendOK(false);
      console.log('we started the function submitFunction()');

      setData(ReworkValues(values));
      console.log(patientinfo);

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

  //data?.message && patientinfo.patientFirstName &&

  useEffect(() => {
    if (submitOK) {
      refetch();
      console.log('were in the useEffect function inside the submitOK');
      console.log(patientinfo);
      console.log(patientinfo.dentistId, ' foreign key error ', parseInt(DentistID));
      console.log('line 82');
      if (data != undefined) {
        setModal(false);
      }
      setSubmitOK(false);
    }
  }, [data, modal, sendOK, submitOK, refetch]);



  //, patientinfo

  return (
    <>
      <div className={styles.btn_modal}>
        <button onClick={toggleModal} className={styleB.relu_btn} id={styleB.fixedWidth}>
          Add Patient
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
                  patientFirstName: '',
                  patientLastName: '',

                  pinned: false,
                  notes: '',
                }}
                // on Submit we console the values + close the popup tab
                onSubmit={submitFunction}
              >
                {({ errors, status, touched }) => (
                  <Form>
                    <div className={styles.rightfont}>
                      <div className={styles.firstandlast}>
                        <div className="mb-3">
                          <Field
                            className="form-control"
                            id="patientFirstName"
                            name="patientFirstName"
                            placeholder="First Name"
                          />
                        </div>

                        <div className="mb-3">
                          <Field
                            className="form-control"
                            id="patientLastName"
                            name="patientLastName"
                            placeholder="Last Name"
                          />
                        </div>
                      </div>

                      <div className="form-group form-check">
                        <Field
                          type="checkbox"
                          name="pinned"
                          className={'form-check-input ' + (errors.pinned && touched.pinned ? ' is-invalid' : '')}
                        />
                        <label htmlFor="pinned" className="form-check-label">
                          Pin patient
                        </label>
                        <ErrorMessage name="pinned" component="div" className="invalid-feedback" />
                      </div>

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
                          Save patient
                        </button>
                        <button type="button" className={styleB.relu_btn} onClick={toggleModal}>
                          Exit
                        </button>
                      </div>
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
