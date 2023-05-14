import { useState } from 'react';
import { SendMenuOptionRequest, Scan, ScanSave } from '@/gen/proto/threedoclusion/v1/service_pb';
import ListView from './list-view';
import stylesVR from '@/styles/MenuVR.module.css';

async function sendMenuOption(optionNumber: number, clnt: any, oData: any) {
  //console.log(oData);
  let req = new SendMenuOptionRequest({});
  req.option = optionNumber;
  req.optionData = { value: oData.value, case: oData.case };

  const res = await clnt.sendMenuOption(req);
  return res;
}

function Menu({
  isOpen,
  setIsOpen,
  current_scan,
  client,
  onLoadItemClicked,
  onQuit,
  onReset,
  onToggle
}: {
  isOpen: boolean;
  setIsOpen: any;
  current_scan: ScanSave;
  client: any;
  onLoadItemClicked: (inputData: ScanSave) => void;
  onQuit: () => void;
  onReset: () => void;
  onToggle: () => void;
}) {
  // Add props with positions, client...
  const [showListView, setShowListView] = useState(false);
  const [listData, setListData] = useState<string[]>([]);
  const [listDictData, setListDictData] = useState({});

  const toggleMenu = () => {
    onToggle();
  };

  const handleLoadItemClicked = (inputData: ScanSave) => {
    onLoadItemClicked(inputData);
    setShowListView(false);
    toggleMenu();
  };

  const save = async () => {
    const optionData = { case: 'saveData', value: current_scan };
    const res = await sendMenuOption(0, client, optionData);
    console.log('Save!');
  };

  const load = async () => {
    const optionData = { case: 'scanId', value: current_scan.scanId };
    sendMenuOption(1, client, optionData)
      .then((res) => {
        if (res) {
          console.log('Load!');
          const extractedTimestamps: string[] = [];
          const dictTimeStamps: { [timestamp: string]: ScanSave } = {};
          for (const scan of res.wrap.loadData) {
            dictTimeStamps[scan.timestampSave] = scan; // Maybe omit id and timestamp values since unnecessary
            extractedTimestamps.push(scan.timestampSave);
          }
          setListData(extractedTimestamps.reverse()); // From most recent to oldest
          setListDictData(dictTimeStamps);
          setShowListView(true);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleBackClick = () => {
    setShowListView(false); // Set showListView to false when Back arrow is clicked
  };

  const saveAndQuit = async () => {
    const optionData = { case: 'saveData', value: current_scan };
    const res = await sendMenuOption(2, client, optionData);
    console.log("Save and quit!")
    onQuit()
  };

  const quit = async () => {
    console.log('I quit!');
    const optionData = { case: 'scanId', value: current_scan.scanId };
    sendMenuOption(3, client, optionData)
      .then((res) => {
        console.log(res);
        onQuit();
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const reset = async () => {
    console.log('Resetting position');
    onReset();
  };

  return isOpen ? (
    <div className={stylesVR.menu_container}>
      <div className={`menu_button ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className={stylesVR.menu_button_bar} />
        <div className={stylesVR.menu_button_bar} />
        <div className={stylesVR.menu_button_bar} />
      </div>
      {!showListView ? (
        <div className={stylesVR.menu_content}>
          <div className={stylesVR.menu_header}>
            <div className={stylesVR.menu_title}>Menu</div>
            <button id={stylesVR.exitIcon} className={stylesVR.icon_btn} onClick={toggleMenu}></button>
          </div>
          <ul className={stylesVR.menu_options}>
            <button className={stylesVR.menu_option} onClick={load}>
              Load
            </button>
            <button className={stylesVR.menu_option} onClick={save}>
              Save manually
            </button>
            <button className={stylesVR.menu_option} onClick={saveAndQuit}>
              Save and quit
            </button>
            <button className={stylesVR.menu_option} onClick={quit}>
              Quit
            </button>
            <button className={stylesVR.menu_option} onClick={reset}>
              Reset
            </button>
          </ul>
        </div>
      ) : (
        <div className={stylesVR.list_view_container}>
          <ListView
            data={listData}
            dictData={listDictData}
            itemsPerPage={4}
            onItemClicked={handleLoadItemClicked}
            onBackClicked={handleBackClick}
          />
        </div>
      )}
    </div>
  ) : null;
}

export default Menu;
