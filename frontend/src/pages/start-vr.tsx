import React, { useEffect, useState } from 'react'
import Menu from '@/components/vr/menu'
import RenderVideo from '@/components/vr/render-video';


import dynamic from 'next/dynamic';

const VRView = dynamic(() => import('@/components/vr/vr-view'), { ssr: false });
const DraggingView = dynamic(() => import('@/components/vr/dragging'), { ssr: false });
const BeforeAfter = dynamic(() => import('@/components/vr/before-after'), { ssr: false });

export default function StartVRPage(){ 
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