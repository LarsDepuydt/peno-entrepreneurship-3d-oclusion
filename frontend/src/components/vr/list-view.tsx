import { useState } from "react";
import { Canvas } from '@react-three/fiber';
import { Html, Plane } from '@react-three/drei';

export default function ListView({ data, dictData, itemsPerPage, onItemClicked, onBackClicked }: { data: any, dictData: any, itemsPerPage: number, onItemClicked: (inputData: any) => void, onBackClicked: () => void }) {
    const [currentPage, setCurrentPage] = useState(0);
  
    const totalPages = Math.ceil(data.length / itemsPerPage);
  
    const handlePrev = () => {
      setCurrentPage(currentPage > 0 ? currentPage - 1 : 0);
    };
  
    const handleNext = () => {
      setCurrentPage(currentPage < totalPages - 1 ? currentPage + 1 : totalPages - 1);
    };

    const handleItemClick = (inputData: any ) => {
      onItemClicked(inputData);
    }
  
    const startIndex = currentPage * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data.length);
  
    return (
        <div className="list-container">
          <div className="list-view">
            <div className="list-view-header">
                <span className="back-arrow" onClick={onBackClicked}>
                  <span className="arrow-left"></span>
                </span>
            </div>
            <div className="list-view-content">
              {data.slice(startIndex, endIndex).map((item, index) => (
                <div key={index} className="list-item" onClick={() => handleItemClick(dictData[item])}>
                  {item}
                </div>
              ))}
          </div>
          <div className="list-controls">
              <span className="arrow-btn" onClick={() => {handlePrev()}}>
                <span className="arrow-left"></span>
              </span>
              <span className="arrow-btn" onClick={() => {handleNext()}}>
                <span className="arrow-right"></span>
              </span>
          </div>
        </div>
            <style jsx>{`
            .list-container {
              position: relative;
              width: 100%;
              height: 100%;
            }
            .list-view-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;
              padding: 10px;
            }
            .list-view-content {
              position: relative;
              display: flex;
              flex-direction: column;
              align-items: center;
              width: 100%;
              height: 90%;
              background-color: #333;
              border-radius: 10px;
              color: #fff;
              font-size: 20px;
              text-align: center;
            }
            .list-item {
              margin: 10px;
              padding: 10px;
              background-color: #444;
              border-radius: 5px;
            }
            .list-controls {
              position: absolute;
              bottom: 5%;
              left: 50%;
              transform: translateX(-50%);
              display: flex;
              align-items: center;
            }
            .arrow-btn {
                display: flex;
                justify-content: center;
                align-items: center;
                background: none;
                border: none;
                cursor: pointer;
                margin: 0 10px;
            }
            .arrow-left {
                width: 0;
                height: 0;
                border-top: 6px solid transparent;
                border-bottom: 6px solid transparent;
                border-right: 12px solid #fff;
            }
            .arrow-right {
                width: 0;
                height: 0;
                border-top: 6px solid transparent;
                border-bottom: 6px solid transparent;
                border-left: 12px solid #fff;
            }
            .back-arrow {
              position: absolute;
              
              cursor: pointer;
              z-index: 999;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          `}</style>
        </div>
    );
}  