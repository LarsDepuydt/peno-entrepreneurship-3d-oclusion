import React from 'react';
import styleB from '@/styles/Buttons.module.css';

function LinkButton() {
  const handleClick = () => {
    window.location.href = "https://relu.eu/";
  };

  return (
    <button className={styleB.relu_btn} id={styleB.LinkIcon} onClick={handleClick}>
    </button>
  );
}

export default LinkButton;
