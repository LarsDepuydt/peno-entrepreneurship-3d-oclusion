import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import styles from '@/styles/Modal.module.css';
import styleB from '@/styles/Buttons.module.css';

import 'bootstrap/dist/css/bootstrap.css';

interface searchName {
  searchID: string;
}

export default function ModalForm() {
  const [modal, setModal] = useState(false);
  // modal is not toggled at first

  const toggleModal = () => {
    setModal(!modal); // change state f -> t and t -> f
  };

  return (
    <>
      <div className={styles.btn_modal}>
        <button onClick={toggleModal} className={styleB.relu_btn}>
          Search by ID
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
                  searchID: '',
                }}
                // on Submit we console the values + close the popup tab
                onSubmit={(values) => {
                  console.log(values);
                  setModal(!modal);
                }}
              >
                {({ errors, status, touched }) => (
                  <Form>
                    <div className={styles.rightfont}>
                      <div className="mb-3">
                        <Field className="form-control" id="searchID" name="searchID" placeholder="Patient ID" />
                      </div>

                      <div className={styles.spacingbtn}>
                        <button type="submit" className={styleB.relu_btn}>
                          Search
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
