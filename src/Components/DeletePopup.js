import React from "react";
import Popup from "./Popup";

const deletePopup = ({ onClose, onYes, onNo }) => (
  <div>
    <Popup className='delete_cube' onClose={onClose}>
      <div>
        <h2>Delete Cube?</h2>
        <button onClick={onYes}>yes</button>
        <button onClick={onNo}>no</button>
      </div>
    </Popup>
  </div>
);

export default deletePopup;
