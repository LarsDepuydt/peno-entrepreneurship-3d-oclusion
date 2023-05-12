import {
  getAllPatients,
  getPatientById,
  updatePatientById,
} from '@/gen/proto/threedoclusion/v1/service-ScanService_connectquery';
import { queryClient } from '@/pages/_app';
import styleB from '@/styles/Buttons.module.css';
import styles from '@/styles/Modal.module.css';
import { useQuery } from '@tanstack/react-query';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';

import { useEffect, useState } from 'react';

interface patientValues {
  PatientFirstName: string;
  PatientLastName: string;

  pinned: boolean;
  notes: string;
}

export default function EditPatientButton({ patientID }: { patientID: number }) {
  let DentistID = process.env.REACT_APP_DENTIST_ID!;

  const [modal, setModal] = useState(false);
  const [submitOK, setSubmitOK] = useState(false);
  const [sendOK, setSendOK] = useState(false);

  //if (patientID != undefined) {
  const query = getPatientById.useQuery({ id: patientID });
  const { data: patientInfoRequest, refetch: refetchPatient } = useQuery(query.queryKey, query.queryFn, {
    enabled: false,
  });

  const toggleModal = () => {
    console.log('modal is set');
    setModal(!modal); // change state f -> t and t -> f
    setSendOK(true);
    refetchPatient();
  };

  const handleRedirect = () => {
    refetch();
    if (submitOK) {
      setSendOK(true);
    }
  };

  const [patientinfo, setData] = useState({
    id: patientID,

    firstName: '',
    lastName: '',

    pinned: false,
    notes: '',

    dentistId: parseInt(DentistID),
  });

  useEffect(() => {
    modal && refetchPatient();
    modal && console.log(patientInfoRequest);
    modal && console.log('inRefetchUseEffect');

    if (modal && patientInfoRequest != undefined) {
      setData(patientInfoRequest);
    }
  }, [modal]);

  useEffect(() => {
    modal && console.log('this is the patientinfo ');
    modal && patientinfo.firstName != '' && console.log(patientinfo);
  }, [modal, patientinfo]);

  const refreshKey = getAllPatients.useQuery().queryKey;
  const { data, refetch } = useQuery(
    updatePatientById.useQuery(patientinfo).queryKey,
    updatePatientById.useQuery(patientinfo).queryFn,
    {
      enabled: false,
      onSuccess: () => queryClient.refetchQueries(refreshKey),
    }
  );

  const ReworkValues = (values: patientValues) => {
    return {
      id: patientID,
      firstName: values.PatientFirstName,
      lastName: values.PatientLastName,
      pinned: values.pinned,
      notes: values.notes,

      dentistId: parseInt(DentistID),
    };
  };

  const submitFunction = (values: patientValues) => {
    if (sendOK && modal) {
      setSendOK(false);
      console.log('we are in the updatepatient update function');

      setData(ReworkValues(values));
      console.log(patientinfo);

      setSubmitOK(true);
      console.log('submitOK is set to true');
    }

    setModal(false);
  };

  useEffect(() => {
    if (submitOK) {
      console.log('in updatepatient useeffect');
      refetch();
      console.log('were in the useEffect function inside the submitOK');
      console.log(patientinfo);
      if (data != undefined) {
        setModal(false);
      }
      setSubmitOK(false);
    }
  }, [data, modal, sendOK, submitOK, refetch]);

  return (
    <>
      <div>
        <button type="button" className={styleB.relu_btn} id={styleB.editIcon} onClick={toggleModal} />
        <div />

        {modal && patientInfoRequest.firstName != '' && (
          <div className={styles.modal}>
            <div className={styles.overlay}></div>
            <div className={styles.modal_content}>
              <div className={styles.login_box + ' p-3'}>
                <Formik
                  initialValues={{
                    pinned: patientInfoRequest?.pinned,
                    notes: patientInfoRequest?.notes,

                    PatientFirstName: patientInfoRequest?.firstName,
                    PatientLastName: patientInfoRequest?.lastName,
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
                              id="PatientFirstName"
                              name="PatientFirstName"
                              placeholder="First Name"
                            />
                          </div>

                          <div className="mb-3">
                            <Field
                              className="form-control"
                              id="PatientLastName"
                              name="PatientLastName"
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
  // } else {
  //   return <button type="button" className={styleB.relu_btn} id={styleB.editIcon} onClick={toggleModal} />;
  // }
}
