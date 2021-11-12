import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Popup from "./Popup";
import "./Popup.css";
import "./logIn.css";
import "../index.css";

function LogIn() {
  const [createAccount, setCreateAccount] = useState(false);

  return (
    <div className='Login'>
      <main>
        <h1>Lim-Dûl's Vault</h1>
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            console.log(evt.currentTarget);
            const username = evt.currentTarget.elements["username"].value;
            const password = evt.currentTarget.elements["password"].value;
            console.log(username, password);
          }}
        >
          <div>
            <label for='username'>
              <input placeholder='Username' name='username' id='username' />
            </label>
          </div>
          <div>
            <label for='password'>
              <input
                placeholder='Password'
                type='password'
                name='password'
                id='password'
              />
            </label>
          </div>
          <div id='logIn-btn'>
            <button>Log In</button>
          </div>
        </form>
        <div>
          <button id='createAcct-btn' onClick={() => setCreateAccount(true)}>
            Create New Account
          </button>
        </div>
        <Popup trigger={createAccount} setTrigger={setCreateAccount}>
          <form
            onSubmit={(evt) => {
              evt.preventDefault();
              console.log(evt.currentTarget);
              const username = evt.currentTarget.elements["username"].value;
              const password = evt.currentTarget.elements["password"].value;
              console.log(username, password);
            }}
          >
            <div>
              <label for='username'>
                <input placeholder='Username' name='username' id='username' />
              </label>
            </div>
            <div>
              <label for='password'>
                <input
                  placeholder='Password'
                  type='password'
                  name='password'
                  id='password'
                />
              </label>
            </div>
            <div id='createAcct'>
              <button id='createAcct-btn'>Create Account</button>
            </div>
          </form>
        </Popup>
      </main>
    </div>
  );
}
export default LogIn;
