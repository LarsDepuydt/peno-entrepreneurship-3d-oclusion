import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, Plane } from '@react-three/drei';
import stylesVR from '@/styles/MenuVR.module.css';

export default function ListView({
  data,
  dictData,
  itemsPerPage,
  onItemClicked,
  onBackClicked,
}: {
  data: any;
  dictData: any;
  itemsPerPage: number;
  onItemClicked: (inputData: any) => void;
  onBackClicked: () => void;
}) {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePrev = () => {
    setCurrentPage(currentPage > 0 ? currentPage - 1 : 0);
  };

  const handleNext = () => {
    setCurrentPage(currentPage < totalPages - 1 ? currentPage + 1 : totalPages - 1);
  };

  const handleItemClick = (inputData: any) => {
    onItemClicked(inputData);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);

  return (
    <div className={stylesVR.list_container}>
      <div className={stylesVR.list_view}>
        <div className={stylesVR.list_view_header}>
          <button id={stylesVR.leftIcon} className={stylesVR.icon_btn} onClick={onBackClicked}></button>
        </div>
        <div className={stylesVR.list_view_content}>
          {data.slice(startIndex, endIndex).map((item, index) => (
            <div key={index} className={stylesVR.list_item} onClick={() => handleItemClick(dictData[item])}>
              {item}
            </div>
          ))}
        </div>
        <div className={stylesVR.list_controls}>
          <button id={stylesVR.leftIcon} className={stylesVR.icon_btn} onClick={handlePrev}></button>
          <button id={stylesVR.rightIcon} className={stylesVR.icon_btn} onClick={handleNext}></button>
        </div>
      </div>
    </div>
  );
}
