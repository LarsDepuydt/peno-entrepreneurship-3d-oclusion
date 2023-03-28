import { WaitingRequest } from "@/gen/proto/threedoclusion/v1/service_pb";
import { ScanService } from "@/gen/proto/threedoclusion/v1/service_connect";

import { createPromiseClient } from "@bufbuild/connect";
import { createConnectTransport } from "@bufbuild/connect-web";
import { useRouter } from 'next/router';

import styles from "@/styles/WaitPage.module.css"

export default function WaitPage() {
  const transport = createConnectTransport({
    baseUrl: "http://0.0.0.0:8080",
    //baseUrl: "https://a952-84-198-210-207.eu.ngrok.io",
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
    <div>
    <h1>Waiting Page</h1>
    <form onSubmit={afterSubmit}>
      Code: <input type="number" id="code" size={20} name="code"/><br/>
      <input type="submit" value="Submit"/> 
    </form>
    </div>
    <div className={styles.spinner}>
    <div className={styles.bounce1}></div>
    <div className={styles.bounce2}></div>
    <div className={styles.bounce3}></div>
    </div>
    </div>
  )
}
