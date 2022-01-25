import React from "react";
// import { Link } from "react-router-dom";
import { useState } from "react";
import Popup from "./Popup";
import "./Popup.css";
import "./logIn.css";
import "../index.css";
import Axios from "axios";

function LogIn() {
  Axios.defaults.withCredentials = true;
  const [createAccountPopup, setCreateAccountPopup] = useState(false);
  const [createUsername, setCreateUsername] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const usernameChange = (event) => {
    setUsername(event.target.value);
  };
  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  const createUsernameChange = (event) => {
    setCreateUsername(event.target.value);
  };

  const createPasswordChange = (event) => {
    setCreatePassword(event.target.value);
  };

  const createAccount = () => {
    Axios.post("http://localhost:3001/createAccount", {
      username: createUsername,
      password: createPassword,
    })
      .then((res) => {
        console.log("Account Created");
        console.log(res);
        setCreateAccountPopup(false);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log("User Already Exists");
          setCreateAccountPopup(false);
        } else {
          console.log("Something's Not Right");
        }
      });
  };

  const loginSubmit = () => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      console.log("Login Successful");
      console.log(response);
      //redirect to cubes page
      document.location.href = "/home";
    });
  };

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
              <input
                placeholder='Username'
                name='username'
                id='username'
                onChange={usernameChange}
              />
            </label>
          </div>
          <div>
            <label for='password'>
              <input
                placeholder='Password'
                type='password'
                name='password'
                id='password'
                onChange={passwordChange}
              />
            </label>
          </div>
          <div id='logIn-btn'>
            <button onClick={loginSubmit}>Log In</button>
          </div>
        </form>
        <div>
          <button
            id='createAcct-btn'
            onClick={() => setCreateAccountPopup(true)}
          >
            Create New Account
          </button>
        </div>
        {createAccountPopup && (
          <Popup onClose={() => setCreateAccountPopup(false)}>
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
                  <input
                    onChange={createUsernameChange}
                    placeholder='Username'
                    name='username'
                    id='username'
                  />
                </label>
              </div>
              <div>
                <label for='password'>
                  <input
                    placeholder='Password'
                    type='password'
                    name='password'
                    id='password'
                    onChange={createPasswordChange}
                  />
                </label>
              </div>
              <div id='createAcct'>
                <button onClick={createAccount} id='createAcct-btn'>
                  Create Account
                </button>
              </div>
            </form>
          </Popup>
        )}
      </main>
    </div>
  );
}
export default LogIn;
