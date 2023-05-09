import styleB from '@/styles/Buttons.module.css';
import styles from '@/styles/Modal.module.css';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';

import { useState } from 'react';

interface patientValues {
  patientFirstName: string;
  patientLastName: string;

  pinned: boolean;
  notes: string;
}

interface patientValues {
  patientFirstName: string;
  patientLastName: string;

  pinned: boolean;
  notes: string;
}

export default function EditPatientButton() {
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal); // change state f -> t and t -> f

  function getCurrentPatient(id: number) {
    return {
      firstName: 'Anna',
      lastName: 'Proost',

      pinned: true,
      notes: 'this is a note',
    };
  }

  return (
    <>
      <div>
        <button type="button" className={styleB.relu_btn} id={styleB.editIcon} onClick={toggleModal} />

        {modal && (
          <div className={styles.modal}>
            <div className={styles.overlay}></div>
            <div className={styles.modal_content}>
              <div className={styles.login_box + ' p-3'}>
                <Formik
                  initialValues={{
                    patientFirstName: getCurrentPatient(2).firstName,
                    patientLastName: getCurrentPatient(2).lastName,

                    pinned: getCurrentPatient(2).pinned,
                    notes: getCurrentPatient(2).notes,
                  }}
                  // on Submit we console the values + close the popup tab
                  onSubmit={(values) => {
                    console.log(values);
                    console.log('From onUploadFile');
                    setModal(!modal);
                  }}
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
                            Pin patient {/* pin patient is too far from checkbox :(*/}
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
                            Edit patient
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
      </div>
    </>
  );
}
