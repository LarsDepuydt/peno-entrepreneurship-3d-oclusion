import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/router';
import styles from '@/styles/PatientPage.module.scss';
import styleB from '@/styles/Buttons.module.css';
import React, { useState } from 'react';

import { InspectScans } from '../../components/patient/inspect_scans';
import DeleteButton from '../patient/delete_patient';
import EditButton from '../patient/edit_patient';
import PinButton from '../patient/pin_patient';

interface patientProfile {
  id: number;
  picture: StaticImageData;
  patientfirstname: string;
  patientlastname: string;
  doctorid: number;
}

export function SinglePatient({ id, picture, patientfirstname, patientlastname }: patientProfile) {
  const [showButtons, setShowButtons] = useState(false);
  const handleMouseEnter = () => {
    setShowButtons(true);
  };
  const handleMouseLeave = () => {
    setShowButtons(false);
  };

  const [dropDown, setDropDown] = useState(false);
  const handleDropDown = () => {
    setDropDown(true);
  };
  const handleDropGone = () => {
    setDropDown(false);
  };

  const router = useRouter();

  return (
    <div className={styles.patientScan_container}>
      {dropDown && (
        <div className={styles.patientScan_dropDown}>
          <div className={styles.dropDownButtonWrapper}>
            <button className={styleB.relu_btn} id={styleB.dropDownButton}>
              test
            </button>
            <button className={styleB.relu_btn} id={styleB.dropDownButton}>
              test
            </button>
            <button className={styleB.relu_btn} id={styleB.dropDownButton}>
              test
            </button>
            <button className={styleB.relu_btn} id={styleB.dropDownButton}>
              test
            </button>
          </div>
          <button type="button" className={styleB.relu_btn} id={styleB.exitIcon} onClick={handleDropGone}></button>
        </div>
      )}
      {!dropDown && (
        <div className={styles.patientScan_normal} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          
          <div className={styles.picture_wrapper}>
            <Image
              id={patientfirstname.concat(' ', patientlastname)}
              className={showButtons ? styles.picture_hover : styles.picture}
              src={picture}
              alt="3d picture of teeth"
            />
          </div>

          {showButtons && (
            <div className={styles.subButtons}>
              <div>
                <button
                  type="button"
                  className={styleB.relu_btn}
                  id={styleB.menuIcon}
                  onClick={handleDropDown}
                ></button>
              </div>
              <InspectScans patientID={id} />
              <EditButton />
              <DeleteButton patientID={id} />
              <PinButton />
            </div>
          )}

          <div className={showButtons ? styles.patientscanNameWrapperInvisible : styles.patientscanNameWrapper}>
            <p className={styles.patientscanName}>{patientfirstname.concat(' ', patientlastname)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
