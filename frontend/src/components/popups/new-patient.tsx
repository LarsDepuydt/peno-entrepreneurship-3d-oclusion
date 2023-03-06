import React, { useState } from "react"
import { Formik, Field, Form} from 'formik';

import styles from '@/styles/Modal.module.css'
import styleL from '@/styles/LoginForm.module.css'


interface patientValues {
    patientFirstName: string;
    patientLastName: string;
    patientID: string;
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
                  patientFirstName: '',
                  patientLastName: '',
                  patientID: '',
                }}
                

                
                // on Submit we console the values + close the popup tab
                onSubmit={(values) => {
                    console.log(values)
                    setModal(!modal)
                    
                }}
              >
                <Form>
                  <div className="mb-3">
                    <Field className="form-control" id="patientFirstName" name="patientFirstName" placeholder="First Name" />
                  </div>

                  <div className="mb-3">
                    <Field className="form-control" id="patientLastName" name="patientLastName" placeholder="Last Name" />
                  </div>


                  <div className="mb-3">
                    <Field className="form-control" id="patientID" name="patientID" placeholder="Patient ID" type="patientID" />
                  </div>
      
                  <button type="submit" className= "btn btn-primary btn-large" >Save patient</button>

                </Form>
              </Formik>

              {/* <button onSubmit={(values) => {console.log(values); toggleModal}} type="submit" className= "btn btn-primary btn-large" >Save patient</button> */}
            </div>
            
        </div>
        
    </div>

    )}

        <p> here are all the patients </p>
        </>
    )
  }