import React, { useEffect, useState } from 'react';

import { ScanService } from '@/gen/proto/threedoclusion/v1/service_connect';
import { createPromiseClient } from '@bufbuild/connect';
import { useTransport } from '@bufbuild/connect-query';
import {
  SubscribeConnectionRequest,
  SubscribeConnectionResponse,
} from '@/gen/proto/threedoclusion/v1/service_pb';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const DraggingView = dynamic(() => import('@/components/vr/dragging'), { ssr: false });

export default function StartVRPage(){ 
  const [isComponentMounted, setIsComponentMounted] = useState(false)
  const [client, setClient] = useState<any>(null);
  const [stream, setStream] = useState<AsyncIterable<SubscribeConnectionResponse> | null>(null);
  const transport = useTransport();
  const router = useRouter();
  const { scanID } = router.query;
  const scanId = parseInt(scanID as string, 10);

  useEffect(() => setIsComponentMounted(true), [])

  if(!isComponentMounted) {
      return null 
  }
  if (!isComponentMounted) {
    return null;
  }
  const isNavigatorAvailable = typeof navigator !== 'undefined';

  if (isNavigatorAvailable) {
    if (stream == null) {
      let promiseClient = createPromiseClient(ScanService, transport);
      setClient(promiseClient);
      setStream(makeStreamOnID(scanId, promiseClient));
    }
  }

  if (stream != null) {
    checkConnected(stream);
  }

  const onQuit = () => {
    router.push('/end-vr');
  };

    const props = { scanId, client, onQuit };

  return (
    // Only executed on the client side
    <div>
      {isNavigatorAvailable}
      <DraggingView {...props} />
    </div>
  );
}

function makeStreamOnID(id: number, clnt: any) {
  // Make a new stream
  const req = new SubscribeConnectionRequest({ scanId: id, deviceId: 1 }); // VR: 1
  return clnt.subscribeConnection(req);
}

async function checkConnected(serverStream: AsyncIterable<SubscribeConnectionResponse>) {
  for await (const res of serverStream) {
    if (res.otherData) {
      console.log(res.otherData);
    }

    if (res.otherNotCreated) {
      console.log('No sign of client yet!');
    }

    if (res.isConnected) {
      console.log('Client has connected!');
    } else {
      console.log('Client has disconnected!');
    }
  }
}
