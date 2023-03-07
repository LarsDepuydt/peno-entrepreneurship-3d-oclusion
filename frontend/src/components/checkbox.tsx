import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

export default function CheckBox() {
        return (
            <Formik
                initialValues={{
                    pinned: false
                }}
                onSubmit={fields => {
                    alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
                }}
            >
                {({ errors, status, touched }) => (
                    <Form>
                        <div className="form-group form-check">
                            <Field type="checkbox" name="pinned" className={'form-check-input ' + (errors.pinned && touched.pinned ? ' is-invalid' : '')} />
                            <label htmlFor="pinned" className="form-check-label">Pin patient</label>
                            <ErrorMessage name="pinned" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary mr-2">Submit</button>
                        </div>
                    </Form>
                )}
            </Formik>
        )
    
} 