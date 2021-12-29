import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import "../index.css";
import "./NavBar.css";
import "./Cube.css";
import { useParams } from "react-router-dom";
import Axios from "axios";
// import Search from "../assets/search-btn.svg";
import Card from "../assets/card.svg";

function Cube({ cubeName }) {
  const { id } = useParams();
  const [cardList, setCardList] = useState([]);
  const [cardName, setCardName] = useState("");
  const [colors, setColors] = useState({
    White: null,
    Blue: null,
    Black: null,
    Red: null,
    Green: null,
    Colorless: null,
  });
  const [cardShow, setCardShow] = useState({
    show: false,
    name: null,
  });

  // const displayColor = () => {
  //     if (color === 'W')
  // };

  const handleCardShow = (name) => {
    setCardShow({ name });
    if (cardShow.name === name) {
      setCardShow({ show: true });
    }
  };

  const handleChange = (event) => {
    setCardName(event.target.value);
  };

  const addCard = () => {
    Axios.get(`https://api.scryfall.com/cards/named?exact=${cardName}`).then(
      (response) => {
        console.log(response);
        Axios.get(`${response.data.set_uri}`).then((responce) => {
          console.log(responce);
          Axios.post("http://localhost:3001/cards", {
            cardName: response.data.name,
            cardId: response.data.id,
            image: response.data.image_uris.png,
            color: response.data.color_identity,
            cardSet: response.data.set,
            cubeId: id,
            setIcon: responce.data.icon_svg_uri,
          })
            .then(() => {
              console.log("Card Added Successfully");
              setCardList([
                ...cardList,
                {
                  name: response.data.name,
                  id: response.data.id,
                  image: response.data.image_uris.png,
                  color: response.data.color_identity,
                  set_icon: responce.data.icon_svg_uri,
                },
              ]);
            })
            .catch(console.error);
        });
      }
    );
  };

  useEffect(() => {
    Axios.get(`http://localhost:3001/cards/${id}`).then((response) => {
      setCardList(response.data);
      console.log(response);
    });
  }, [id]);

  useEffect(() => {
    Axios.get("https://api.scryfall.com/symbology").then((response) => {
      console.log(response);
      setColors({
        White: response.data.data[57].svg_uri,
        Blue: response.data.data[58].svg_uri,
        Black: response.data.data[59].svg_uri,
        Red: response.data.data[60].svg_uri,
        Green: response.data.data[61].svg_uri,
        Colorless: response.data.data[62].svg_uri,
      });
    });
  }, []);
  console.log(colors);

  console.log(cubeName);
  return (
    <div>
      <NavBar>
        {/* <img id='search_btn' src={Search} alt='Submit Search' /> */}
        <div>
          <h2>{cubeName}</h2>
        </div>
        <div>
          <button onClick={addCard}>Add Card</button>
          <div className='search'>
            <input name='search' type='text' onChange={handleChange} />
            {/* <select>
              <option value='Date Made'>Date Made</option>
              <option value='Size'>Size</option>
              <option value='Name'>Name</option>
            </select> */}
          </div>
        </div>
      </NavBar>
      {cardList.map(({ id, name, image, color, set_icon }) => {
        return (
          <div className='card' key={id}>
            <div id='card_counter'>
              <button>-</button>
              <h1>1</h1>
              <button>+</button>
            </div>
            <div id='middle'>
              <img
                src={Card}
                id='card_svg'
                alt='card_hover'
                onMouseEnter={() => handleCardShow(name)}
                onMouseLeave={() => setCardShow(false)}
              />
              <div id='cardName'>
                <h1>{name}</h1>
              </div>
            </div>
            {color === "W" ? (
              <div id='color'>
                <img src={colors.White} alt='white' />
              </div>
            ) : color === "U" ? (
              <div id='color'>
                <img src={colors.Blue} alt='blue' />
              </div>
            ) : color === "B" ? (
              <div id='color'>
                <img src={colors.Black} alt='black' />
              </div>
            ) : color === "R" ? (
              <div id='color'>
                <img src={colors.Red} alt='red' />
              </div>
            ) : color === "G" ? (
              <div id='color'>
                <img src={colors.Green} alt='green' />
              </div>
            ) : color === "" ? (
              <div id='color'>
                <img src={colors.Colorless} alt='colorless' />
              </div>
            ) : (
              console.log("error")
            )}
            <div id='set'>
              <img src={set_icon} alt='set' />
            </div>
            {cardShow && cardShow.name === name && (
              <img className='cardHover' src={image} alt='pic' />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Cube;
