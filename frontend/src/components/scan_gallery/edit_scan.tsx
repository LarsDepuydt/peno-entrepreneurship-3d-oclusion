import styleB from '@/styles/Buttons.module.css';
import styles from '@/styles/Modal.module.css';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';

import { useState } from 'react';

/* still needs to be implemented, just a dummy button */
interface scanValues {
  type_overbite: boolean;
  type_underbite: boolean;
  type_crossbite: boolean;

  type_reconstructive: boolean;
  type_jawsurgery: boolean;
}

export default function EditScanButton() {
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal); // change state f -> t and t -> f

  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;

  function getCurrentScan(id: number) {
    return {
      overbite: true,
      underbite: false,
      crossbite: false,

      reconstructive: false,
      jawsurgery: true,
    };
  }

  return (
    <>
      <div>
        <button type="button" className={styleB.relu_btn} id={styleB.editIcon} onClick={toggleModal} />
      </div>

      {modal && (
        <div className={styles.modal}>
          <div className={styles.overlay}></div>
          <div className={styles.modal_content}>
            <div className={styles.login_box + ' p-3'}>
              <Formik
                initialValues={{
                  type_overbite: getCurrentScan(2).overbite,
                  type_underbite: getCurrentScan(2).underbite,
                  type_crossbite: getCurrentScan(2).crossbite,

                  type_reconstructive: getCurrentScan(2).reconstructive,
                  type_jawsurgery: getCurrentScan(2).jawsurgery,
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
                        Edit scan
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
