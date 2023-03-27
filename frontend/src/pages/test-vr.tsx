import React, { useEffect, useState } from 'react'

import dynamic from 'next/dynamic';

const VRView = dynamic(() => import('@/components/vr/vr-view'), { ssr: false });
const DraggingView = dynamic(() => import('@/components/vr/dragging'), { ssr: false });

export default function TestVRPage(){ 
    const [isComponentMounted, setIsComponentMounted] = useState(false)
  
    useEffect(() => setIsComponentMounted(true), [])
  
    if(!isComponentMounted) {
        return null
    }
    const isNavigatorAvailable = typeof navigator !== "undefined";
    return ( // Only executed on the client side
        <div>
            {isNavigatorAvailable}
            < VRView />
        </div>
    )
}