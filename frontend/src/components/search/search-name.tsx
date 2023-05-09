import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import styles from '@/styles/Modal.module.css';
import styleB from '@/styles/Buttons.module.css';

import 'bootstrap/dist/css/bootstrap.css';
import { getPatientByName } from '@/gen/proto/threedoclusion/v1/service-ScanService_connectquery';
import { useQuery } from '@tanstack/react-query';

import router from 'next/router';

interface namePatient {
  firstName: string;
  lastName: string;
}

export default function ModalForm() {
  const [modal, setModal] = useState(false);
  // modal is not toggled at first

  const [patientname, setData] = useState({ firstName: '', lastName: '' });
  //let DentistID = process.env.REACT_APP_DENTIST_ID!;

  const query = getPatientByName.useQuery(patientname);
  const { data } = useQuery(query.queryKey, query.queryFn, { enabled: false });

  const toggleModal = () => {
    setModal(!modal); // change state f -> t and t -> f
  };

  const submitFunction = (values: namePatient) => {
    console.log(values);
    setData(values);
    console.log(data);

    const fn = values.firstName;
    const ln = values.lastName;

    if (data != undefined && data?.patients.length != 0) {
      router.push({
        pathname: '/patient-name',
        query: {
          fn,
          ln,
        },
      });
    } else {
      setModal(modal!);
    }
  };

  return (
    <>
      <div className={styles.btn_modal}>
        <button onClick={toggleModal} className={styleB.relu_btn} id={styleB.fixedWidth}>
          Search by name
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
                  firstName: '',
                  lastName: '',
                }}
                // on Submit we console the values + close the popup tab
                onSubmit={(values) => {
                  submitFunction(values);
                }}
              >
                {({ errors, status, touched }) => (
                  <Form>
                    <div className={styles.rightfont}>
                      <div className={styles.firstandlast}>
                        <div className="mb-3">
                          <Field className="form-control" id="firstName" name="firstName" placeholder="First Name" />
                        </div>

                        <div className="mb-3">
                          <Field className="form-control" id="lastName" name="lastName" placeholder="Last Name" />
                        </div>
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
