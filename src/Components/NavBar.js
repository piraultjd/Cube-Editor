import React from "react-dom";
import Popup from "./Popup";
import { useState } from "react";
import Account from "../assets/account-btn.svg";
import Home from "../assets/home-btn.svg";
import Search from "../assets/search-btn.svg";
import "./Popup.css";
import "../index.css";

function NavBar() {
  const [accountSettings, setAccountSettings] = useState(false);

  return (
    <div id='NavBar'>
      <div class='home'>
        <img id='home_btn' src={Home} />
      </div>
      <div class='middle'>
        <img id='search_btn' src={Search} />
        <div class='search'>
          <input name='search' type='text' />
          <select>
            <option selected value='Date Made'>
              Date Made
            </option>
            <option value='Size'>Size</option>
            <option value='Name'>Name</option>
          </select>
        </div>
      </div>
      <div>
        <div class='acct_settings'>
          <img
            id='acct_settings_btn'
            onClick={() => setAccountSettings(true)}
            src={Account}
          />
        </div>
        <h2>Username</h2>
      </div>
      <Popup
        className='acct-settings'
        trigger={accountSettings}
        setTrigger={setAccountSettings}
      >
        <div className='btn-container'>
          <button className='settings-btn'>Add Friend</button>
          <button className='settings-btn'>Change Password</button>
          <button className='settings-btn'>Change Username</button>
          <button className='settings-btn'>Log Out</button>
        </div>
      </Popup>
    </div>
  );
}

export default NavBar;
