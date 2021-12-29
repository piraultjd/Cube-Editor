import React from "react";
import "./Popup.css";

function Popup(props) {
  return (
    <div className='popup'>
      <div className='popup-inner'>
        <button className='close-btn' onClick={props.onClose}>
          Close
        </button>
        {props.children}
      </div>
    </div>
  );
}

export default Popup;
