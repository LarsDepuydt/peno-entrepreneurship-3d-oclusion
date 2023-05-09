import { getScanById } from '@/gen/proto/threedoclusion/v1/service-ScanService_connectquery';
import styleB from '@/styles/Buttons.module.css';
import styles from '@/styles/Modal.module.css';
import { useQuery } from '@tanstack/react-query';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';

import { useEffect, useState } from 'react';

export default function EditScanButton({ scanID }: { scanID: number }) {
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal); // change state f -> t and t -> f

  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;

  const query = getScanById.useQuery({ id: scanID });
  const { data, refetch } = useQuery(query.queryKey, query.queryFn, { enabled: false });
  console.log(data);

  useEffect(() => {
    modal && refetch();
  }, [modal]);

  if (data != undefined) {
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
                    notes: data.notes,
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
  } else {
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
                    notes: '',
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
}
