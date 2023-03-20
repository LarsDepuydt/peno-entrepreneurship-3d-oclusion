import React, { useState, MouseEvent } from 'react';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';

import styles from '@/styles/Modal.module.css';
import styleB from '@/styles/Buttons.module.css';

// TODO add files + tags

interface scanValues {
  scanName: string;

  type_overbite: boolean;
  type_underbite: boolean;
  type_crossbite: boolean;

  type_reconstructive: boolean;
  type_jawsurgery: boolean;

  file: string;
}

export default function ModalForm() {
  const onCancelFile = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('From onCancelFile');
  };

  const onUploadFile = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('From onUploadFile');
  };

  const [modal, setModal] = useState(false);
  // modal is not open at first

  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;

  const toggleModal = () => setModal(!modal); // change state f -> t and t -> f

  return (
    <>
      <div className={styles.btn_modal}>
        <button onClick={toggleModal} className={styleB.relu_btn}>
          Add Scans
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
                  scanName: '',

                  type_overbite: false,
                  type_underbite: false,
                  type_crossbite: false,

                  type_reconstructive: false,
                  type_jawsurgery: false,

                  file: '',
                }}
                // on Submit we console the values + close the popup tab
                // implicit date = currentDate
                onSubmit={(values) => {
                  console.log(values, currentDate);
                  console.log(currentDate);
                  setModal(!modal);
                }}
              >
                {({ errors, status, touched }) => (
                  <Form>
                    <div className="mb-3">
                      <Field className="form-control" id="scanName" name="scanName" placeholder="Scan Name" />
                    </div>

                    <div className={styles.type_bite}>
                      <div className="form-group form-check">
                        <Field
                          type="checkbox"
                          name="type_overbite"
                          className={
                            'form-check-input ' + (errors.type_overbite && touched.type_overbite ? ' is-invalid' : '')
                          }
                        />
                        <label htmlFor="type_overbite" className="form-check-label">
                          overbite
                        </label>
                        <ErrorMessage name="type_overbite" component="div" className="invalid-feedback" />
                      </div>

                      <div className="form-group form-check">
                        <Field
                          type="checkbox"
                          name="type_underbite"
                          className={
                            'form-check-input ' + (errors.type_underbite && touched.type_underbite ? ' is-invalid' : '')
                          }
                        />
                        <label htmlFor="type_underbite" className="form-check-label">
                          underbite
                        </label>
                        <ErrorMessage name="type_underbite" component="div" className="invalid-feedback" />
                      </div>

                      <div className="form-group form-check">
                        <Field
                          type="checkbox"
                          name="type_crossbite"
                          className={
                            'form-check-input ' + (errors.type_crossbite && touched.type_crossbite ? ' is-invalid' : '')
                          }
                        />
                        <label htmlFor="type_crossbite" className="form-check-label">
                          crossbite
                        </label>
                        <ErrorMessage name="type_crossbite" component="div" className="invalid-feedback" />
                      </div>
                    </div>

                    <div className={styles.type_surgery}>
                      <div className="form-group form-check">
                        <Field
                          type="checkbox"
                          name="type_reconstructive"
                          className={
                            'form-check-input ' +
                            (errors.type_reconstructive && touched.type_reconstructive ? ' is-invalid' : '')
                          }
                        />
                        <label htmlFor="type_reconstructive" className="form-check-label">
                          reconstructive surgery
                        </label>
                        <ErrorMessage name="type_reconstructive" component="div" className="invalid-feedback" />
                      </div>

                      <div className="form-group form-check">
                        <Field
                          type="checkbox"
                          name="type_jawsurgery"
                          className={
                            'form-check-input ' +
                            (errors.type_jawsurgery && touched.type_jawsurgery ? ' is-invalid' : '')
                          }
                        />
                        <label htmlFor="type_jawsurgery" className="form-check-label">
                          jaw surgery
                        </label>
                        <ErrorMessage name="type_jawsurgery" component="div" className="invalid-feedback" />
                      </div>
                    </div>

                    <form className="w-full p-3" action="">
                      <div className="flex flex-col md:flex-row gap-1.5 md:py-4">
                        <label className="flex flex-col items-center justify-center flex-grow h-full py-3 transition-colors duration-150 cursor-pointer hover:text-gray-600">
                          <input className="block w-0 h-0" name="file" type="file" />
                        </label>
                      </div>
                    </form>

                    <div className={styles.spacingbtn}>
                      <button type="submit" className={styleB.relu_btn}>
                        Save scans
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
