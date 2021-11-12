import React from "react";
import NavBar from "../Components/NavBar";
import "./Popup.css";
import "../index.css";
import "./homePage.css";
import Popup from "./Popup";
import { useState } from "react";
import "./NavBar.css";
import Axios from "axios";

function HomePage() {
  const currentDate = new Date();
  const now =
    currentDate.getFullYear() +
    "/" +
    currentDate.getMonth() +
    "/" +
    currentDate.getDate();

  const handleChange = (event) => {
    setCubeName(event.target.value);
  };
  const [createCube, setCreateCube] = useState(false);
  const [cubeName, setCubeName] = useState("");
  const [dateCreated, setDateCreated] = useState(now);

  const submitCube = () => {
    Axios.post("https://localhost:3000/cubes", {
      cubeName: cubeName,
      dateCreated: dateCreated,
    }).then(() => {
      alert("Cube Submitted Successfully");
    });
  };

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className='createCube'>
        <button id='createCube' onClick={() => setCreateCube(true)}>
          Add Cube
        </button>
      </div>
      <div>
        <Popup
          className='new-cube'
          trigger={createCube}
          setTrigger={setCreateCube}
        >
          <div>
            <form>
              <label for='cubename'>
                Cube Name:
                <input
                  name='cubename'
                  id='cubename'
                  value={cubeName}
                  onChange={handleChange}
                />
              </label>
              <button onClick={submitCube}>Create</button>
            </form>
          </div>
        </Popup>
      </div>
    </div>
  );
}
export default HomePage;
