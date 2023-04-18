import { Formik, Field, Form, ErrorMessage } from 'formik';

import styles from '@/styles/Modal.module.css';
import styleB from '@/styles/Buttons.module.css';

import 'bootstrap/dist/css/bootstrap.css';

import { useQuery } from '@tanstack/react-query';
import { addPatient } from '@/gen/proto/threedoclusion/v1/service-ScanService_connectquery';
import { useEffect, useState } from 'react';

interface patientValues {
  //patientID: string;
  patientFirstName: string;
  patientLastName: string;

  pinned: boolean;
  // kunnen we van pinned een boolean maken?
  notes: string;
}

export default function ModalForm() {
  const [modal, setModal] = useState(false);
  // modal is not toggled at first

  const [patientinfo, setData] = useState({
    //patientID: '',
    patientFirstName: '',
    patientLastName: '',
    pinned: false,
    notes: '',
  });

  const { data } = useQuery(addPatient.useQuery(patientinfo));
  // kunnen we van pinned een boolean maken?

  const toggleModal = () => {
    setModal(!modal); // change state f -> t and t -> f
  };

  const submitFunction = (values: patientValues) => {
    console.log(values);
    //setData(values);
    setModal(!modal);
  };

  // useEffect(() => {
  // }, [data, patientinfo]);
  // heeft geen effect ?

  return (
    <>
      <div className={styles.btn_modal}>
        <button onClick={toggleModal} className={styleB.relu_btn}>
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
                  patientID: '',
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
                      <div className="mb-3">
                        <Field
                          className="form-control"
                          id="patientID"
                          name="patientID"
                          placeholder="Patient ID"
                          type="patientID"
                        />
                      </div>

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
                        <button type="submit" className={styleB.relu_btn}>
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
