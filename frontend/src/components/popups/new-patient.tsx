import React, { useState } from "react"
import { Formik, Field, Form, ErrorMessage} from 'formik';

import styles from '@/styles/Modal.module.css'
import styleB from '@/styles/Buttons.module.css'

import 'bootstrap/dist/css/bootstrap.css'

interface patientValues {
    patientID: string;
    patientFirstName: string;
    patientLastName: string;
    
    pinned: boolean;
    notes: string;
}


export default function ModalForm() {


    const [modal, setModal] = useState(false);
    // modal is not toggled at first


    const toggleModal = () => {
        setModal(!modal)    // change state f -> t and t -> f
    }


    return (
        <>

    <div className={styles.btn_modal}>
    <button onClick={toggleModal}  className={styleB.relu_btn}>Add Patient</button>
    {/* translation files bekijken */}
    </div>
  
    {modal && (
        <div className={styles.modal}>
        <div className={styles.overlay}></div>
        <div className={styles.modal_content}>

        <div className={styles.login_box + ' p-3'}>   
              
              <Formik
                initialValues={{
                  patientID: '',
                  patientFirstName: '',
                  patientLastName: '',

                  pinned: false,
                  notes: ''
                }}
                

                
                // on Submit we console the values + close the popup tab
                onSubmit={(values) => {
                    console.log(values)
                    setModal(!modal)
                    
                }}
              >
                {({ errors, status, touched }) => (
                <Form>

                  <div className="mb-3">
                    <Field className="form-control" id="patientID" name="patientID" placeholder="Patient ID" type="patientID" />
                  </div>

                  <div className={styles.firstandlast}>
                  <div className="mb-3">
                    <Field className="form-control" id="patientFirstName" name="patientFirstName" placeholder="First Name" />
                  </div>

                  <div className="mb-3">
                    <Field className="form-control" id="patientLastName" name="patientLastName" placeholder="Last Name" />
                  </div>
                  </div>

                  <div className="form-group form-check">
                            <Field type="checkbox" name="pinned" className={'form-check-input ' + (errors.pinned && touched.pinned ? ' is-invalid' : '')} />
                            <label htmlFor="pinned" className="form-check-label">Pin patient</label>
                            <ErrorMessage name="pinned" component="div" className="invalid-feedback" />
                        </div>

                  <div className="mb-3">
                    <Field className="form-control" id="notes" name="notes" placeholder="Additional notes" type="notes" />
                  </div>
      
                  <div className ={styles.spacingbtn}>
                  <button type="submit" className={styleB.relu_btn} >Save patient</button>
                  <button type="button" className={styleB.relu_btn} onClick={toggleModal} >Exit</button>
                  </div>

                </Form>
                )}
              </Formik>

            </div>
            
        </div>
        
    </div>

    )}
        </>
    )
  }