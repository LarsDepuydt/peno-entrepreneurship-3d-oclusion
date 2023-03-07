import React, { useState } from "react"
import { Formik, Field, Form} from 'formik';

import styles from '@/styles/Modal.module.css'
import styleL from '@/styles/LoginForm.module.css'


// no formik; how to add files + tags? with button (onClick) + css?

interface scanValues {
  scanID: string;

  scanDay: number;
  scanMonth: number;
  scanYear: number;
    //scanTags: string;

    //scan: vr files
}


export default function ModalForm() {

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
        Add Scan
    </button>

    {/* short circuit operator */}
    {modal && (
        <div className={styles.modal}>
        <div className={styles.overlay}></div>
        <div className={styles.modal_content}>

        <div className={styleL.login_box + ' p-3'}>   
              
              <Formik
                initialValues={{
                  scanID: '',

                  scanDay: '',
                  scanMonth: '',
                  scanYear: '',

                  //scanTags: '',
                }}
                

                
                // on Submit we console the values + close the popup tab
                onSubmit={(values) => {
                    console.log(values)
                    setModal(!modal)
                    
                }}
              >
                <Form>
                  <div className="mb-3">
                    <Field className="form-control" id="scanName" name="scanName" placeholder="Scan Name" />
                  </div>

                  <div className="mb-3">
                    <Field className="form-control" id="scanTags" name="scanTags" placeholder="Scan Tags" />
                  </div>
      
                  <button type="submit" className= "btn btn-primary btn-large" >Save scans</button>

                </Form>
              </Formik>

              {/* <button onSubmit={(values) => {console.log(values); toggleModal}} type="submit" className= "btn btn-primary btn-large" >Save patient</button> */}
            </div>
            
        </div>
        
    </div>

    )}
        </>
    )
  }