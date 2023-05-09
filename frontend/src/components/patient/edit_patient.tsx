import { getPatientById, updatePatientById } from '@/gen/proto/threedoclusion/v1/service-ScanService_connectquery';
import styleB from '@/styles/Buttons.module.css';
import styles from '@/styles/Modal.module.css';
import { useQuery } from '@tanstack/react-query';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';

import { useEffect, useState } from 'react';

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

export default function EditPatientButton({ patientID }: { patientID: number }) {
  let DentistID = process.env.REACT_APP_DENTIST_ID!;

  const [modal, setModal] = useState(false);
  const [submitOK, setSubmitOK] = useState(false);
  const [sendOK, setSendOK] = useState(false);

  const toggleModal = () => setModal(!modal); // change state f -> t and t -> f

  const query = getPatientById.useQuery({ id: patientID });
  const { data, refetch } = useQuery(query.queryKey, query.queryFn, { enabled: false });

  const handleRedirect = () => {
    refetch();
    if (submitOK) {
      setSendOK(true);
    }
  };

  useEffect(() => {
    refetch();
  }, [modal]);

  if (data != undefined) {
    // const [patientinfo, setData] = useState({
    //   firstName: '',
    //   lastName: '',

    //   pinned: false,
    //   notes: '',

    //   dentistId: 0,
    // });

    // const { data, refetch } = useQuery(
    //   updatePatientByID.useQuery(patientinfo).queryKey,
    //   addPatient.useQuery(patientinfo).queryFn,
    //   { enabled: false }
    // );

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
                      patientFirstName: data.firstName,
                      patientLastName: data.lastName,

                      pinned: data.pinned,
                      notes: data.notes,
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
                            <button type="submit" className={styleB.relu_btn} onClick={handleRedirect}>
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
  } else {
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
                      patientFirstName: '',
                      patientLastName: '',

                      pinned: false,
                      notes: '',
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
                            <button type="submit" className={styleB.relu_btn} onClick={handleRedirect}>
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
}
