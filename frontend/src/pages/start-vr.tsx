import React, { useEffect, useState } from 'react'
import Menu from '@/components/vr/menu'
import RenderVideo from '@/components/vr/render-video';

import { ScanService } from "@/gen/proto/threedoclusion/v1/service_connect";
import { createPromiseClient } from "@bufbuild/connect";
import { useTransport } from "@bufbuild/connect-query";
import { ConnectionStatusUpdatesRequest, ConnectionStatusUpdatesResponse } from "@/gen/proto/threedoclusion/v1/service_pb";


import dynamic from 'next/dynamic';

const VRView = dynamic(() => import('@/components/vr/vr-view'), { ssr: false });
const DraggingView = dynamic(() => import('@/components/vr/dragging'), { ssr: false });
const BeforeAfter = dynamic(() => import('@/components/vr/before-after'), { ssr: false });

export default function StartVRPage(){ 
    const scanId = 111;
    const [isComponentMounted, setIsComponentMounted] = useState(false)
    const [stream, setStream] = useState<AsyncIterable<ConnectionStatusUpdatesResponse> | null>(null);
    const transport = useTransport();
  
    useEffect(() => setIsComponentMounted(true), [])
  
    if(!isComponentMounted) {
        return null 
    }
    const isNavigatorAvailable = typeof navigator !== "undefined";

    if (isNavigatorAvailable){
        if (stream == null){
            setStream(makeStreamOnID(scanId, transport))
        }
    }

    if (stream != null){
        checkConnected(stream);
    }

    return ( // Only executed on the client side
        <div>
            {isNavigatorAvailable}
            < Menu />
        </div>
    )
}

function makeStreamOnID(id: number, transport: any){
    // Make a new stream
    const client = createPromiseClient(ScanService, transport);
    const req = new ConnectionStatusUpdatesRequest({isConnected: true, scanId: id, fromVr: false});
    return client.connectionStatusUpdates(req);
  }
  
async function checkConnected(serverStream: AsyncIterable<ConnectionStatusUpdatesResponse>) {
for await (const res of serverStream){

    if (res.otherData){
        console.log(res.otherData)
    }

    if (!res.isConnected){ // Client disconnected
    // Close stream... How?
    //serverStream.Close() ?
    // Show some other component
        console.log("Client disconnected!")
    }
}
}