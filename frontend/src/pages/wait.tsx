
import { WaitingRequest } from "@/gen/proto/threedoclusion/v1/service_pb";
import { ScanService } from "@/gen/proto/threedoclusion/v1/service_connect";

import { createPromiseClient } from "@bufbuild/connect";
import { useTransport } from "@bufbuild/connect-query";


import { useRouter } from 'next/router';
import { useState } from "react";

import styleL from '@/styles/LandingPage.module.css';

import Image from 'next/image';
import reluLogo from '../../public/relu-logo-small.png';

import styles2 from '@/styles/LoginForm.module.css';
import styleB from '@/styles/Buttons.module.css';

import styles from "@/styles/WaitPage.module.css"

export default function WaitPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formVisible, setFormVisible] = useState(true); // Add formVisible state

  const transport = useTransport();

  const router = useRouter();

  function afterSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let codeInput = document.getElementById("code") as HTMLInputElement | null;
    let codeString = ""
    let codeValue = 0 // Default
    let submitOK = true;

    if (codeInput){
      codeString = codeInput.value
      codeValue = parseInt(codeString, 10)
    }
  
    if (codeString.length > 10) {
      alert("The code may have no more than 10 characters");
      submitOK = false;
    }

    // Additional criteria

    if (submitOK) { // Trigger waiting procedure
      waitForResponse(codeValue);
      setSubmitted(true); // Set submitted state to true
      setFormVisible(false); // Set formVisible to false
    }
  }

  async function waitForResponse(codeValue: number) {
    const client = createPromiseClient(ScanService, transport);

    const req = new WaitingRequest({uniqueCode : codeValue})

    const stream = client.waiting(req)
    for await (const res of stream){
      if (res.redirect){
        router.push(res.url)
      }
    }
  }

  return (
    <div>
      {formVisible && (
      <div className={styleL.all_landing}>

        <div className={styleL.loginbox}>
    <div className={styles.container}>
    <Image className={styles2.small_logo_log} src={reluLogo} alt="relu logo" />
    <form onSubmit={afterSubmit}>
      Code: <input type="number" id="code" size={20} name="code" className={styles.inputstyle}/><br/>
      <div>
      <input type="submit" value="Submit" className={styles.relu_btn}/> 
      </div>
    </form>
    </div>
    </div>
      </div>
    )}

    {submitted && ( // Display the following divs only if submitted is true
    <div className={styles.bodah}>
          <Image className={styles.small_logo_log} src={reluLogo} alt="relu logo" />
    <div className={styles.loading}>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
    </div>
    </div>
    )}
    </div>
  )
}




/*<div className="mb-3">
            <Field
              className="form-control"
              id="username"
              name="username"
              placeholder="User token"
              aria-describedby="usernameHelp"
            />
          </div>

          <div className={styles.spacingbtn}>
            <button type="submit" className={styleB.relu_btn}>
              Submit
            </button>
          </div>  */