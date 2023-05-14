import { useState } from "react";
import { SendMenuOptionRequest, Scan, ScanSave } from "@/gen/proto/threedoclusion/v1/service_pb";
import ListView from "./list-view";

async function sendMenuOption(optionNumber: number, clnt: any, oData: any){
  let req = new SendMenuOptionRequest({});
  req.option = optionNumber;
  req.optionData = {value: oData.value, case: oData.case};

  const res = await clnt.sendMenuOption(req);
  return res;
}

function Menu({isOpen, setIsOpen, current_scan, client, onLoadItemClicked, onQuit, onReset, onToggle}: {isOpen: boolean, setIsOpen: any, current_scan: ScanSave, client: any, onLoadItemClicked: (inputData: ScanSave) => void, onQuit: () => void, onReset: () => void, onToggle: () => void}){ // Add props with positions, client...
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
  }


  const save = async () => {
    const optionData = { case: "saveData", value: current_scan }
    const res = await sendMenuOption(0, client, optionData);
    console.log("Save!")
  };

  const load = async () => {
    const optionData = { case: "scanId", value: current_scan.scanId };
    sendMenuOption(1, client, optionData)
      .then((res) => {
        if (res) {
          console.log("Load!");
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
        console.error("Error fetching data:", error);
      });
  };

  const handleBackClick = () => {
    setShowListView(false); // Set showListView to false when Back arrow is clicked
  };
  

  const saveAndQuit = async () => {
    const optionData = {case: "saveData", value: current_scan,}
    const res = await sendMenuOption(2, client, optionData);
    console.log("Save and quit!")
    onQuit()
  };

  const quit = async () => {
    console.log("I quit!")
    const optionData = {case: "scanId", value: current_scan.scanId,} 
    sendMenuOption(3, client, optionData)
      .then((res) => {
        console.log(res);
        onQuit();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const reset = async () => {
    console.log('Resetting position');
    onReset();
  }

  return (
    isOpen ? (
    <div className="menu-container">
      <div className={`menu-button ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
        <div className="menu-button-bar" />
        <div className="menu-button-bar" />
        <div className="menu-button-bar" />
      </div>
      {!showListView ? (
        <div className="menu-content">
          <div className="menu-header">
            <div className="menu-title">Menu</div>
            <div className="menu-close" onClick={toggleMenu}>
              &times;
            </div>
          </div>
          <ul className="menu-options">
            <li className="menu-option" onClick={load}>Load</li>
            <li className="menu-option" onClick={save}>Save manually</li>
            <li className="menu-option" onClick={saveAndQuit}>Save and quit</li>
            <li className="menu-option" onClick={quit}>Quit</li>
            <li className="menu-option" onClick={reset}>Reset</li>
          </ul>
        </div>
      ):(
        <div className="list-view-container">
          <ListView data={listData} dictData={listDictData}  itemsPerPage={4} onItemClicked={handleLoadItemClicked} onBackClicked={handleBackClick}/>
        </div>
      )}
    <style jsx>{`
        .list-view-container {
          position: relative;
          top: 0;
          left: 0;
          z-index: 999;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background-color: #333;
        }
        .menu-container {
          position: relative;
          border: 1px solid #000; // Add border around the menu
          margin: auto;
          z-index: 999;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.8);
          width: 300px;
          height: 350px;
        }
        .menu-content {
          z-index: 999;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          background-color: #333;
          border-radius: 10px;
          color: #fff;
          font-size: 20px;
          text-align: center;
        }
        .menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 10px;
        }
        .menu-title {
          font-size: 24px;
          font-weight: bold;
        }
        .menu-close {
          cursor: pointer;
          font-size: 30px;
        }
        .menu-options {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .menu-option {
          margin: 5px;
          padding: 10px;
          background-color: #444;
          border-radius: 5px;
          font-size: 15px;
        }
      `}</style>
      </div>
    ) : null
  )
};

export default Menu;