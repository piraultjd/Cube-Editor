import React from "react-dom";
import Popup from "./Popup";
import { useState } from "react";
import Account from "../assets/account-btn.svg";
import Home from "../assets/home-btn.svg";

import "./Popup.css";
import "../index.css";
import { Link } from "react-router-dom";

function NavBar(props) {
  const [accountSettings, setAccountSettings] = useState(false);

  return (
    <div id='NavBar'>
      <div className='home'>
        <Link to='/home'>
          <img id='home_btn' src={Home} alt='Home Button' />
        </Link>
      </div>
      <div className='middle'>{props.children}</div>
      <div>
        <div className='acct_settings'>
          <img
            id='acct_settings_btn'
            onClick={() => setAccountSettings(true)}
            src={Account}
            alt='Account Settings'
          />
        </div>
        <h2>Username</h2>
      </div>
      {accountSettings && (
        <Popup
          className='acct-settings'
          onClose={() => setAccountSettings(false)}
        >
          <div className='btn-container'>
            <button className='settings-btn'>Add Friend</button>
            <button className='settings-btn'>Change Password</button>
            <button className='settings-btn'>Change Username</button>
            <button className='settings-btn'>Log Out</button>
          </div>
        </Popup>
      )}
    </div>
  );
}

export default NavBar;
