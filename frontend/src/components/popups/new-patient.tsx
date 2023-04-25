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
  const [modal, setModal] = useState(false);
  // modal is not toggled at first

  const [patientinfo, setData] = useState({
    patientFirstName: '',
    patientLastName: '',
    pinned: false,
    notes: '',
  });

  const { data } = useQuery(addPatient.useQuery(patientinfo));

  const toggleModal = () => {
    setModal(!modal); // change state f -> t and t -> f
  };

  const ReworkValues = (values: patientValues) => {
    if (values.pinned) {
      return {
        patientFirstName: values.patientFirstName,
        patientLastName: values.patientLastName,
        pinned: 1,
        notes: '',
      };
    } else {
      return {
        patientFirstName: values.patientFirstName,
        patientLastName: values.patientLastName,
        pinned: 0,
        notes: '',
      };
    }
  };

  const submitFunction = (values: patientValues) => {
    console.log(values);
    //console.log(ReworkValues(values));
    //setData(ReworkValues(values));
    setData(values);

    // fout zit bij pinned : true / false
    console.log(data);
    setModal(!modal);
  };

  //data?.message && patientinfo.patientFirstName &&

  useEffect(() => console.log(data), [data]);

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
