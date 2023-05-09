import styleB from '@/styles/Buttons.module.css';
import React, { useState } from 'react';

/* still needs to be implemented, just a dummy button */

export default function PinPatientButton() {
  const [pinned, setPinned] = useState(false);
  const pinPatient = () => {
    setPinned(true);
  };
  const unpinPatient = () => {
    setPinned(false);
  };
  
  return (
    <div>
      {pinned && (
        <div>
          <button type="button" className={styleB.relu_btn} id={styleB.pinnedIcon} onClick={unpinPatient}></button>
        </div>
      )}

      {!pinned && (
        <div>
          <button type="button" className={styleB.relu_btn} id={styleB.unpinnedIcon} onClick={pinPatient}></button>
        </div>
      )}
    </div>
  );
}
