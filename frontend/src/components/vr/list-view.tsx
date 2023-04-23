import { Any } from "@bufbuild/protobuf";
import { useState } from "react";

export default function ListView({ data, dictData, itemsPerPage, onItemClicked }: { data: any, dictData: any, itemsPerPage: number, onItemClicked: (inputData: any) => void }) {
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
        <div className="list-view-content">
          {data.slice(startIndex, endIndex).map((item, index) => (
            <div key={index} className="list-item" onClick={() => handleItemClick(dictData[item])}>
              {item}
            </div>
          ))}
        </div>
        <div className="list-view-controls">
          <button className="arrow-btn" onClick={handlePrev}>
            <span className="arrow-left"></span>
        </button>
          <button className="arrow-btn" onClick={handleNext}>
            <span className="arrow-right"></span>
          </button>
        </div>
        </div>
        <style jsx>{`
        .list-container {
            position: relative;
        }
        .list-view-content {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 300px;
          height: 300px;
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
        .list-view-controls {
            position: absolute;
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
      `}</style>
      </div>
    );
}  