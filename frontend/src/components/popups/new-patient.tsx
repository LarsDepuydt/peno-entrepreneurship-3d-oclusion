import React, { useState } from "react"
import { Formik, Field, Form, ErrorMessage} from 'formik';

import styles from '@/styles/Modal.module.css'
import styleL from '@/styles/LoginForm.module.css'

import 'bootstrap/dist/css/bootstrap.css'

interface patientValues {
    patientID: string;
    patientFirstName: string;
    patientLastName: string;
    
    pinned: boolean;
    notes: string;
    //images: array[]
}


export default function ModalForm() {

  // const handleSubmit = (e: { preventDefault: () => void; }) => {
  //   e.preventDefault();
  //   console.log("button clicked"); }

    const [modal, setModal] = useState(false);
    // modal is not toggled at first


    const toggleModal = () => {
        setModal(!modal)    // change state f -> t and t -> f
    }

  //   const togglePinned = () => {
  //     setModal(!pinned)    // change state f -> t and t -> f
  // }

    return (
        <>

    <button 
    onClick={toggleModal}
    className={styles.btn_modal}>
        Add Patient
    </button>

    {/* short circuit operator */}
    {modal && (
        <div className={styles.modal}>
        <div className={styles.overlay}></div>
        <div className={styles.modal_content}>

        <div className={styleL.login_box + ' p-3'}>   
              
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

                  <div className="mb-3">
                    <Field className="form-control" id="patientFirstName" name="patientFirstName" placeholder="First Name" />
                  </div>

                  <div className="mb-3">
                    <Field className="form-control" id="patientLastName" name="patientLastName" placeholder="Last Name" />
                  </div>

                  <div className="form-group form-check">
                            <Field type="checkbox" name="pinned" className={'form-check-input ' + (errors.pinned && touched.pinned ? ' is-invalid' : '')} />
                            <label htmlFor="pinned" className="form-check-label">Pin patient</label>
                            <ErrorMessage name="pinned" component="div" className="invalid-feedback" />
                        </div>

                  <div className="mb-3">
                    <Field className="form-control" id="notes" name="notes" placeholder="Additional notes" type="notes" />
                  </div>
      
                  <div className ={styles.newbtn}>
                  <button type="submit" className= "btn btn-primary btn-large" >Save patient</button>
                  <button type="button" className= "btn btn-primary btn-large" onClick={toggleModal} >Exit</button>
                  </div>

                </Form>
                )}
              </Formik>

              {/* <button onSubmit={(values) => {console.log(values); toggleModal}} type="submit" className= "btn btn-primary btn-large" >Save patient</button> */}
            </div>
            
        </div>
        
    </div>

    )}
        </>
    )
  }