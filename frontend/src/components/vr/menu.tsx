import { useState } from "react";
import { SendMenuOptionRequest } from "@/gen/proto/threedoclusion/v1/service_pb";


async function sendMenuOption(optionNumber: number, clnt: any){
  const req = new SendMenuOptionRequest({option: optionNumber, optionData: {
    case: "scanId",
    value: 111
    } 
  });
  const res = await clnt.sendMenuOption(req);
  return res;
}

function Menu({ stream, client }: {stream: any, client: any}){ // Add props with positions, stream, client...
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const load = () => {
  };

  const save = () => {
  };

  const saveAndQuit = () => {
  };

  const quit = () => {
    const res = sendMenuOption(3, client);
    // console.log(res.OtherData);
    // Close stream
    console.log("I quit!")
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
