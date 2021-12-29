import React, { useEffect } from "react";
import NavBar from "../Components/NavBar";
import "./Popup.css";
import "../index.css";
import "./homePage.css";
import Popup from "./Popup";
import { useState } from "react";
import "./NavBar.css";
import Axios from "axios";
import Cube from "../assets/cube.svg";
import DeletePopup from "./DeletePopup";
import { Link } from "react-router-dom";

function HomePage({ onCubeSelected }) {
  const currentDate = new Date();
  const now =
    currentDate.getMonth() +
    1 +
    "/" +
    currentDate.getDate() +
    "/" +
    currentDate.getFullYear();

  const handleChange = (event) => {
    setCubeName(event.target.value);
  };
  const [createCube, setCreateCube] = useState(false);
  const [cubeName, setCubeName] = useState("");
  const [dateCreated] = useState(now);
  const [cubeList, setCubeList] = useState([]);
  const [deleteCubePopup, setDeleteCubePopup] = useState({
    show: false,
    id: null,
  });

  useEffect(() => {
    Axios.get("http://localhost:3001/cubes").then((response) => {
      setCubeList(response.data);
      // console.log(response);
    });
  }, []);

  const submitCube = () => {
    Axios.post("http://localhost:3001/cubes", {
      cubeName: cubeName,
      dateCreated: dateCreated,
    }).then(() => {
      console.log("Cube Submitted Successfully");
    });
    setCreateCube(false);
    Axios.get("http://localhost:3001/cubes").then((response) => {
      setCubeList(response.data);
    });
  };

  const deleteCube = (id) => {
    Axios.delete(`http://localhost:3001/cubes/delete/${id}`).then(() => {
      setCubeList(
        cubeList.filter((val) => {
          return val.id !== id;
        })
      );
    });
    setDeleteCubePopup(false);
  };

  return (
    <div>
      <div>
        <NavBar />
      </div>
      {cubeList.map(({ cube_name, date_created, id }) => {
        return (
          <div className='cube' key={id}>
            <div className='cubePic'>
              <Link
                onClick={() => onCubeSelected(cube_name)}
                to={`/home/cubes/${id}`}
              >
                <img id='cube_img' src={Cube} alt='Cube' />
              </Link>
            </div>
            <div className='name'>
              <h2>{cube_name}</h2>
            </div>
            <div className='date'>
              <h2>{date_created}</h2>
            </div>
            <div className='delete'>
              <button
                onClick={() => setDeleteCubePopup({ show: true, id })}
                id='delete'
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
      {deleteCubePopup.show && (
        <DeletePopup
          onClose={() => setDeleteCubePopup({ show: false })}
          onYes={() => {
            deleteCube(deleteCubePopup.id);
          }}
          onNo={() => setDeleteCubePopup(false)}
        />
      )}
      <div className='createCube'>
        <button id='createCube' onClick={() => setCreateCube(true)}>
          Add Cube
        </button>
      </div>
      <div>
        {createCube && (
          <Popup className='new-cube' onClose={() => setCreateCube(false)}>
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
                <button type='button' onClick={submitCube}>
                  Create
                </button>
              </form>
            </div>
          </Popup>
        )}
      </div>
    </div>
  );
}
export default HomePage;
