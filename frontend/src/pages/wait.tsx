
import { WaitingRequest } from "@/gen/proto/threedoclusion/v1/service_pb";
import { ScanService } from "@/gen/proto/threedoclusion/v1/service_connect";

import { createPromiseClient } from "@bufbuild/connect";
import { createConnectTransport } from "@bufbuild/connect-web";
import { useRouter } from 'next/router';
import { useState } from "react";
import { useEffect } from "react";

import Cookies from 'js-cookie';

import styleL from '@/styles/LandingPage.module.css';

import Image from 'next/image';
import reluLogo from '../../public/relu-logo-small.png';

import styles2 from '@/styles/LoginForm.module.css';
import styleB from '@/styles/Buttons.module.css';

import styles from "@/styles/WaitPage.module.css"

export default function WaitPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formVisible, setFormVisible] = useState(true); // Add formVisible state

  const transport = createConnectTransport({
    baseUrl: "http://0.0.0.0:8080",
  });

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
      let cookieActive = false;
      waitForResponse(codeValue, cookieActive);
      setSubmitted(true); // Set submitted state to true
      setFormVisible(false); // Set formVisible to false
    }
  }
  // See _app, can't use queryClient for streams so I made a new client here -> implement in _app as well to support other streams?

  async function waitForResponse(codeValue: number, cookieActive: boolean) {
    const client = createPromiseClient(ScanService, transport);

    //added
    if (!cookieActive) {
      const codeString: string = `${codeValue}`;
      Cookies.set('cookie', codeString, { expires: 7, path: '/' });

      console.log(Cookies.get('cookie'));
    }

    /*const cookieCode = Cookies.get('cookie');

    var req = new WaitingRequest({uniqueCode : codeValue});

    if (cookieCode) {
      const cookieString = parseInt(cookieCode);
      req = new WaitingRequest({uniqueCode : cookieString});
      console.log(cookieString);
    } else {
      const codeString: string = `${codeValue}`;
      Cookies.set('cookie', codeString, { expires: 7, path: '/' });

      console.log(Cookies.get('cookie'));
      req = new WaitingRequest({uniqueCode : codeValue});
    }  */

    const req = new WaitingRequest({uniqueCode : codeValue})

    const stream = client.waiting(req)
    for await (const res of stream){
      if (res.redirect){
        router.push(res.url)
      }
    }
  }
  
  useEffect(() => {
    const cookieCode = Cookies.get('cookie');

    if (cookieCode) {
      let cookieActive = true;
      const cookieString = parseInt(cookieCode);
      waitForResponse(cookieString, cookieActive);
      console.log(cookieString);
      setSubmitted(true); // Set submitted state to true
      setFormVisible(false); // Set formVisible to false
    }
    else {
      let cookieActive = false;
    }
  }, [router.pathname]);

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