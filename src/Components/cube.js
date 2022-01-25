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
  Axios.defaults.withCredentials = true;
  const { id } = useParams();
  const [cardList, setCardList] = useState([]);
  const [cardName, setCardName] = useState("");
  const [colors] = useState({
    White: "https://c2.scryfall.com/file/scryfall-symbols/card-symbols/W.svg",
    Blue: "https://c2.scryfall.com/file/scryfall-symbols/card-symbols/U.svg",
    Black: "https://c2.scryfall.com/file/scryfall-symbols/card-symbols/B.svg",
    Red: "https://c2.scryfall.com/file/scryfall-symbols/card-symbols/R.svg",
    Green: "https://c2.scryfall.com/file/scryfall-symbols/card-symbols/G.svg",
    Colorless:
      "https://c2.scryfall.com/file/scryfall-symbols/card-symbols/C.svg",
  });
  const [cardShow, setCardShow] = useState({
    show: false,
    name: null,
  });

  const displayColor = (color) => {
    let colorName;
    const colorArr = color.split(",");
    return colorArr.map((val) => {
      switch (val) {
        case "W":
          colorName = colors.White;
          break;
        case "U":
          colorName = colors.Blue;
          break;
        case "B":
          colorName = colors.Black;
          break;
        case "R":
          colorName = colors.Red;
          break;
        case "G":
          colorName = colors.Green;
          break;
        case "":
          colorName = colors.Colorless;
          break;
        default:
          throw new Error("Color Not Available");
      }
      return <img id='color' src={colorName} alt={colorName} />;
    });
  };

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
    Axios.get(`https://api.scryfall.com/cards/named?exact=${cardName}`, {
      withCredentials: false,
    }).then((response) => {
      console.log(response);
      Axios.get(`${response.data.set_uri}`, { withCredentials: false }).then(
        (responce) => {
          console.log(responce);
          let color_identity = response.data.color_identity.join();
          Axios.post(
            "http://localhost:3001/cards",
            {
              cardName: response.data.name,
              cardId: response.data.id,
              image: response.data.image_uris.png,
              color: color_identity,
              cardSet: response.data.set,
              cubeId: id,
              setIcon: responce.data.icon_svg_uri,
            },
            { withCredentials: true }
          )
            .then(() => {
              console.log("Card Added Successfully");
              setCardList([
                ...cardList,
                {
                  name: response.data.name,
                  id: response.data.id,
                  image: response.data.image_uris.png,
                  color: color_identity,
                  set_icon: responce.data.icon_svg_uri,
                },
              ]);
            })
            .catch(console.error);
        }
      );
    });
  };

  useEffect(() => {
    Axios.get(`http://localhost:3001/cards/${id}`).then((response) => {
      setCardList(response.data);
      console.log(response);
      console.log("hit");
    });
  }, [id]);

  // useEffect(() => {
  //   Axios.get("https://api.scryfall.com/symbology").then((response) => {
  //     console.log(response);
  //     setColors({
  //       White: response.data.data[57].svg_uri,
  //       Blue: response.data.data[58].svg_uri,
  //       Black: response.data.data[59].svg_uri,
  //       Red: response.data.data[60].svg_uri,
  //       Green: response.data.data[61].svg_uri,
  //       Colorless: response.data.data[62].svg_uri,
  //     });
  //   });
  // }, []);
  // console.log(colors);

  console.log(cubeName);
  return (
    <div>
      <NavBar>
        <div>
          <h2>{cubeName}</h2>
        </div>
        <div>
          <button onClick={addCard}>Add Card</button>
          <div className='search'>
            <input name='search' type='text' onChange={handleChange} />
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
            <div className='color'>{displayColor(color)}</div>
            <div className='set'>
              <img id='set' src={set_icon} alt='set' />
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
