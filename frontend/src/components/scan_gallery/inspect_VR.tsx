import styleB from '@/styles/Buttons.module.css';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { ScanService } from "@/gen/proto/threedoclusion/v1/service_connect";
import { createPromiseClient } from "@bufbuild/connect";
import { useTransport } from "@bufbuild/connect-query";
import { sendVR } from '@/gen/proto/threedoclusion/v1/service-ScanService_connectquery'
import { SendVRRequest, SubscribeConnectionRequest, SubscribeConnectionResponse } from "@/gen/proto/threedoclusion/v1/service_pb";

//import Cookies from 'js-cookie';
const Cookies = require('js-cookie');
import { useRouter } from 'next/router';

type InspectVRProps = {
    patientID: number;
    scanID : number; 
    setStream: (stream: AsyncIterable<SubscribeConnectionResponse>) => void;
}

function generateCode(): string {
  return Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
}

function makeStreamOnID(id: number, client: any){
  // Make a new stream
  //const client = createPromiseClient(ScanService, transport);
  const req = new SubscribeConnectionRequest({scanId: id, deviceId: 0}); // 0 for client
  return client.subscribeConnection(req);
}
  
export function InspectVR({ patientID, scanID, setStream }: InspectVRProps){
  const [code, setCode] = useState(generateCode());
  const [displayCode, setDisplayCode] = useState('');
  const router = useRouter();

  const [clientId, setClientId] = useState<number | undefined>(undefined);
  const [submitOK, setSubmitOK] = useState(false);
  const [sendOK, setSendOK] = useState(false);
  const transport = useTransport();

  const client = createPromiseClient(ScanService, transport);

  const handleSendVR = () => {
    const req = new SendVRRequest({scanId: scanID, clientId });
    client.sendVR(req);
    makeStreamOnID(scanID, client);
  };

  
    
  useEffect(() => {
      let cookieCode: string | undefined;
      if (typeof window !== 'undefined') {
        cookieCode = Cookies.get('clientcookie');
    }


    if (!cookieCode) {
      const codeString: string = `${code}`;
      Cookies.set('clientcookie', codeString, { expires: 7, path: '/' });
      console.log('new code:', code);
      setDisplayCode(code);
    } else {
      setDisplayCode(cookieCode);
      console.log('your code already is:', cookieCode);
    }

    setClientId(parseInt(cookieCode as string, 10));
    setSubmitOK(true);
  }, []); // On rerender
  


  /*
  const clickPatient = () => {
      router.push({
        pathname: '/scans-page',
        query: {
          patientID,  
          scanID,
        },
      });
  };*/

  return (
      <div>
          <button type="submit" className={styleB.relu_btn} id={styleB.InspectVR}  onClick={handleSendVR}>
          </button>
      </div>
  );
}