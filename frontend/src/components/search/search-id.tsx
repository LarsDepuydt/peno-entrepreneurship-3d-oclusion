import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import styles from '@/styles/Modal.module.css';
import styleB from '@/styles/Buttons.module.css';

import 'bootstrap/dist/css/bootstrap.css';
import { getPatientById } from '@/gen/proto/threedoclusion/v1/service-ScanService_connectquery';
//import { InspectScans } from '../../components/patient/inspect_scans';
import { useQuery } from '@tanstack/react-query';

import router from 'next/router';

interface IDpatient {
  SearchID: string;
}

export default function ModalForm() {
  const [modal, setModal] = useState(false);
  // modal is not toggled at first

  const [patientid, setData] = useState({ id: 0 });
  let DentistID = process.env.REACT_APP_DENTIST_ID!;

  //const query = GetPatientByIdRequest.useQuery(parseInt(patientid));
  const query = getPatientById.useQuery(patientid);
  const { data } = useQuery(query.queryKey, query.queryFn, { enabled: false });

  const toggleModal = () => {
    setModal(!modal); // change state f -> t and t -> f
  };

  const ReworkValue = (values: IDpatient) => {
    return { id: parseInt(values.SearchID) };
  };

  const clickPatient = (values: IDpatient) => {
    process.env.REACT_APP_PATIENT_ID = values.SearchID;
    const idquery = parseInt(values.SearchID);
    router.push({
      pathname: '/scans-page',
      query: {
        idquery,
      },
    });
  };

  const submitFunction = (values: IDpatient) => {
    console.log(values);
    setData(ReworkValue(values));
    console.log(data);
    if (data?.dentistId == parseInt(DentistID)) {
      clickPatient(values);
    } else setModal(modal!);
  };

  return (
    <>
      <div className={styles.btn_modal}>
        <button onClick={toggleModal} className={styleB.relu_btn} id={styleB.fixedWidth}>
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
                  SearchID: '',
                }}
                // on Submit we console the values + close the popup tab
                onSubmit={(values) => {
                  submitFunction(values);
                }}
              >
                {({ errors, status, touched }) => (
                  <Form>
                    <div className={styles.rightfont}>
                      <div className="mb-3">
                        <Field className="form-control" id="SearchID" name="SearchID" placeholder="Patient ID" />
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
