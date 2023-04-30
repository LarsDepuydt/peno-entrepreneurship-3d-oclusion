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
    first_name: '',
    last_name: '',

    pinned: false,
    notes: '',

    dentist_id: 0,
  });

  //const { data } = useQuery(addPatient.useQuery(patientinfo));

  //const query = addPatient.useQuery(patientinfo);

  const { data, refetch } = useQuery(
    addPatient.useQuery(patientinfo).queryKey,
    addPatient.useQuery(patientinfo).queryFn,
    { enabled: false }
  );

  const toggleModal = () => {
    setModal(!modal); // change state f -> t and t -> f
  };

  const ReworkValues = (values: patientValues) => {
    return {
      first_name: values.patientFirstName,
      last_name: values.patientLastName,
      pinned: values.pinned,
      notes: values.notes,

      dentist_id: parseInt(DentistID),
    };
  };

  // useEffect(() => {
  //   console.log('patientinfo = ', patientinfo);
  //   refetch();
  // }, [patientinfo]);

  const submitFunction = (values: patientValues) => {
    console.log('we started the function submitFunction()');
    console.log(ReworkValues(values));
    setData(ReworkValues(values));

    //console.log(data);
    setSubmitOK(true);
    console.log('submitOK is set to true');
    setModal(!modal);
  };

  const handleRedirect = () => {
    console.log('we started the function handleRedirect()');
    if (submitOK) {
      setSendOK(true);
      console.log('sendOK is set to true');
    }
  };

  //data?.message && patientinfo.patientFirstName &&

  useEffect(() => {
    if (submitOK) {
      console.log('were in the useEffect function inside the submitOK');
      console.log(patientinfo);
      console.log(patientinfo.dentist_id, ' foreign key error ', parseInt(DentistID));
      refetch();
      setSendOK(false);
      console.log('line 82');
      if (data != undefined) {
        setModal(!modal);
      }
      setSubmitOK(false);
      console.log('submitOK is set to false');
    }
  }, [data, modal, sendOK, submitOK]);

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
