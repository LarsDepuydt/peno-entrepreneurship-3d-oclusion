import React, { useState } from "react"
import { Formik, Field, Form} from 'formik';

import styles from '@/styles/Modal.module.css'


// TODO add files + tags

interface scanValues {
  scanID: string;
}


export default function ModalForm() {

    const [modal, setModal] = useState(false);
    // modal is not open at first

    const date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
    let currentDate = `${month}-${day}-${year}`;

    const toggleModal = () => setModal(!modal)    // change state f -> t and t -> f

    return (
        <>

  <div className={styles.btn_modal}>
    <button onClick={toggleModal}  className="btn btn-primary btn-large btn-secondary">Add Scans</button>
    {/* translation files bekijken */}
    </div>

    {modal && (
        <div className={styles.modal}>
        <div className={styles.overlay}></div>
        <div className={styles.modal_content}>

        <div className={styles.login_box + ' p-3'}>   
              
              <Formik
                initialValues={{
                  scanID: '',


                }}
                

                
                // on Submit we console the values + close the popup tab
                // implicit date = currentDate
                onSubmit={(values) => {
                    console.log(values)
                    console.log(currentDate)
                    setModal(!modal)
                    
                }}
              >
                <Form>
                  <div className="mb-3">
                    <Field className="form-control" id="scanID" name="scanID" placeholder="Scan ID" />
                  </div>

                  <h3>scans to be added here </h3>

                  <button type="submit" className= "btn btn-primary btn-large" >Save scans</button>

                </Form>
              </Formik>

            </div>
            
        </div>
        
    </div>

    )}
        </>
    )
  }