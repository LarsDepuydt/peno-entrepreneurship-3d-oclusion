import { WaitingRequest } from "@/gen/proto/threedoclusion/v1/service_pb";
import { ScanService } from "@/gen/proto/threedoclusion/v1/service_connect";

import { createPromiseClient } from "@bufbuild/connect";
import { createConnectTransport } from "@bufbuild/connect-web";
import { useRouter } from 'next/router';
import { useState } from "react";

import styles from "@/styles/WaitPage.module.css"
//import styles from "@/styles/globals.css"

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
      waitForResponse(codeValue);
      setSubmitted(true); // Set submitted state to true
      setFormVisible(false); // Set formVisible to false
    }
  }
  // See _app, can't use queryClient for streams so I made a new client here -> implement in _app as well to support other streams?

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
      {formVisible && ( // Display the form only if formVisible is true
        <div>
          <h1>Waiting Page</h1>
          <form onSubmit={afterSubmit}>
            Code: <input type="number" id="code" size={20} name="code"/><br/>
            <input type="submit" value="Submit"/> 
          </form>
        </div>
      )}
      {submitted && ( // Display the following divs only if submitted is true
        <div className={styles.bodah}>
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

/*  <div className={styles.spinner}>
    <div className={styles.bounce1}></div>
    <div className={styles.bounce2}></div>
    <div className={styles.bounce3}></div>
    </div> */