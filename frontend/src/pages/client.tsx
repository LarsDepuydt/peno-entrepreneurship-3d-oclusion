import Link from 'next/link'

import { sendVR } from '@/gen/proto/threedoclusion/v1/service-ScanService_connectquery'
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { ScanService } from "@/gen/proto/threedoclusion/v1/service_connect";
import { createPromiseClient } from "@bufbuild/connect";
import { useTransport } from "@bufbuild/connect-query";
import { SubscribeConnectionRequest, SubscribeConnectionResponse, UpdateConnectionStatusRequest, UpdateConnectionStatusResponse } from "@/gen/proto/threedoclusion/v1/service_pb";

//import Cookies from 'js-cookie';
const Cookies = require('js-cookie');
import styles from "@/styles/ClientPage.module.css"

import Image from 'next/image';
import reluLogo from '../../public/relu-logo-small.png';


function generateCode(): string {
  return Array.from({length: 8}, () => Math.floor(Math.random() * 10)).join('');
}

function makeStreamOnID(id: number, transport: any){
  // Make a new stream
  const client = createPromiseClient(ScanService, transport);
  const req = new SubscribeConnectionRequest({scanId: id, deviceId: 0}); // 0 for client
  return client.subscribeConnection(req);
}

async function checkConnected(serverStream: AsyncIterable<SubscribeConnectionResponse>) {
  for await (const res of serverStream){
    if (res.isConnected){
      console.log("VR has connected!")
    }

    else { 
      // Close stream...
      //serverStream.Close() ?
      //serverStream.cancel()
      // Show some other component
      console.log("VR has disconnected!")
    }
  }
  
}

export default function ClientPage() {
    const [code, setCode] = useState(generateCode());
    const [displayCode, setDisplayCode] = useState('');

    var displaycode;

    let scanId = 111 // Should be generated by clicking on certain scan
    const [clientId, setClientId] = useState<number | undefined>(undefined);
    const [submitOK, setSubmitOK] = useState(false);
    const [sendOK, setSendOK] = useState(false);
    const [stream, setStream] = useState<AsyncIterable<SubscribeConnectionResponse> | null>(null);
    const transport = useTransport();
    
    const query = sendVR.useQuery({ clientId, scanId });
    const { data, refetch } = useQuery(query.queryKey, query.queryFn, { enabled: false });

    
    if (stream != null){ 
      checkConnected(stream);
    }


    useEffect(() => {
      if (submitOK) {
        refetch();
        setSendOK(false);

        const newStream = makeStreamOnID(scanId, transport);
        setStream(newStream);
      }      
    }, [sendOK]);

    function afterSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      let codeInput = document.getElementById("code") as HTMLInputElement | null;
      if (codeInput){
        setClientId(parseInt(codeInput.value, 10));
      }
      setSubmitOK(true);
    }

    const handleRedirect = () => {
       if (submitOK){
        setSendOK(true);
       }
       // if redirect OK -> Redirect OK prompt. Open new connection to /start-VR TO CHECK STATUS
       // With new connection:
       // If manual exit here: send to /start-VR
       // If data from new connection: exit: OK, saved: OK or NOT OK -> Prompt saved successfully.
    };

    
    useEffect(() => {
      let cookieCode: string | undefined;
      if (typeof window !== 'undefined') {
        cookieCode = Cookies.get('clientcookie');
      }

      //const cookieCode = Cookies.get('clientcookie');
  
      if (!cookieCode) {
        const codeString: string = `${code}`;
        Cookies.set('clientcookie', codeString, { expires: 7, path: '/' });
        console.log('new code:', code);
        setDisplayCode(code);
      }
      else {
        setDisplayCode(cookieCode);
        console.log('your code already is:', cookieCode);
      }

      setClientId(parseInt(cookieCode as string, 10));
      setSubmitOK(true);

    }, [code]);

  return (
    <div className={styles.container}>
      <Image className={styles.small_logo_log} src={reluLogo} alt="relu logo" />
      <h3 className={styles.h3}>{displayCode}</h3>
      <p className={styles.p}>Enter the code above in your VR headset.</p>
      <button id="redirect-button" onClick={handleRedirect} className={styles.btn}>Send to VR</button>
    </div>
    
  )
}

//old
/*
<div>
      <h1>Client Page</h1>
      <form onSubmit={afterSubmit}>
        Code: <input type="text" id="code" size={20} name="code"/><br/>
        <input type="submit" value="Submit"/> 
      </form>
      <button id="redirect-button" onClick={handleRedirect}>Send to VR</button>

      <button>
        <Link href="/video">Video</Link>
      </button>
    </div>
*/
