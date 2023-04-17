import React, { useEffect, useState } from 'react'
import Menu from '@/components/vr/menu'
import RenderVideo from '@/components/vr/render-video';

import { ScanService } from "@/gen/proto/threedoclusion/v1/service_connect";
import { createPromiseClient } from "@bufbuild/connect";
import { useTransport } from "@bufbuild/connect-query";
import { SubscribeConnectionRequest, SubscribeConnectionResponse, SendMenuOptionRequest } from "@/gen/proto/threedoclusion/v1/service_pb";


import dynamic from 'next/dynamic';

const VRView = dynamic(() => import('@/components/vr/vr-view'), { ssr: false });
const DraggingView = dynamic(() => import('@/components/vr/dragging'), { ssr: false });
const BeforeAfter = dynamic(() => import('@/components/vr/before-after'), { ssr: false });

export default function StartVRPage(){ 
    const scanId = 111;
    const [isComponentMounted, setIsComponentMounted] = useState(false)
    const [client, setClient] = useState<any>(null);
    const [stream, setStream] = useState<AsyncIterable<SubscribeConnectionResponse> | null>(null);
    const transport = useTransport();
  
    useEffect(() => setIsComponentMounted(true), [])
  
    if(!isComponentMounted) {
        return null 
    }
    const isNavigatorAvailable = typeof navigator !== "undefined";

    if (isNavigatorAvailable){
        if (stream == null){
            let promiseClient = createPromiseClient(ScanService, transport);
            setClient(promiseClient)
            setStream(makeStreamOnID(scanId, promiseClient))
        }
    }
    
    if (stream != null){
        checkConnected(stream);
    }

    const props = { stream, client };

    return ( // Only executed on the client side
        <div>
            {isNavigatorAvailable}
            < Menu {...props} />
        </div>
    )
}

function makeStreamOnID(id: number, clnt: any){
    // Make a new stream
    const req = new SubscribeConnectionRequest({scanId: id, deviceId: 1}); // VR: 1
    return clnt.subscribeConnection(req);
}
  
async function checkConnected(serverStream: AsyncIterable<SubscribeConnectionResponse>) {
for await (const res of serverStream){

    if (res.otherData){
        console.log(res.otherData)
    }

    if (res.otherNotCreated){
        console.log("No sign of client yet!")
    }

    if (!res.isConnected){ // Client disconnected
    // Close stream... How?
    //serverStream.Close() ?
    // Show some other component
        console.log("Client disconnected!")
    }
}
}