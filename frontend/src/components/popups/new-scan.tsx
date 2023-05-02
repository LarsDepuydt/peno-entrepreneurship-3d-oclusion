import React, { useState, MouseEvent, ChangeEvent } from 'react';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';

import styles from '@/styles/Modal.module.css';
import styleB from '@/styles/Buttons.module.css';
// TODO add files + tags

interface scanValues {
  type_overbite: boolean;
  type_underbite: boolean;
  type_crossbite: boolean;

  type_reconstructive: boolean;
  type_jawsurgery: boolean;

  file: string;
}

export default function ModalForm() {
  //  file handlers
  const onFileUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('From onFileUploadChange');
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
        <button onClick={toggleModal} className={styleB.relu_btn} id={styleB.fixedWidth}>
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
                  console.log('From onUploadFile');
                  setModal(!modal);
                }}
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

                    <div className={styles.spacingbtn}>
                      <button type="submit" className={styleB.relu_btn}>
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
