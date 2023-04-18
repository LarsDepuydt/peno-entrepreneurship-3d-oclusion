import { useState } from "react";
import { SendMenuOptionRequest, Scan } from "@/gen/proto/threedoclusion/v1/service_pb";


async function sendMenuOption(optionNumber: number, clnt: any, oData: any){
  const req = new SendMenuOptionRequest({option: optionNumber, optionData: oData
  });
  const res = await clnt.sendMenuOption(req);
  return res;
}

function Menu({ current_scan, stream, client }: {current_scan: Scan, stream: any, client: any}){ // Add props with positions, client...
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  const save = () => {
    const optionData = {case: "saveData", value: current_scan,}
    const res = sendMenuOption(0, client, optionData);
    console.log("Save!")
  };

  const load = () => {
    const optionData = {case: "scanId", value: 111,} 
    const res = sendMenuOption(1, client, optionData);
    console.log("Load!")

    // Do something with received data
  };

  const saveAndQuit = () => {
    const optionData = {case: "saveData", value: current_scan,}
    const res = sendMenuOption(2, client, optionData);
    console.log("Save and quit!")
  };

  const quit = () => {
    const optionData = {case: "scanId", value: 111,} 
    const res = sendMenuOption(3, client, optionData);
    console.log("I quit!")
    //console.log((res as any).OtherData);
    // Close stream here?
    // Redirect...
  };

  return (
    <div className="menu-container">
      <div className={`menu-button ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
        <div className="menu-button-bar" />
        <div className="menu-button-bar" />
        <div className="menu-button-bar" />
      </div>
      {isOpen && (
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
          </ul>
        </div>
      )}
      <style jsx>{`
        .menu-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 999;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.8);
        }
        .menu-content {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 300px;
          height: 300px;
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
          margin: 10px;
          padding: 10px;
          background-color: #444;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default Menu;
