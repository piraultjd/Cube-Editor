import React, { useState } from "react";
import Cube from "../src/Components/cube";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "../src/Components/logIn";
import HomePage from "../src/Components/homePage";

function App() {
  const [cubeName, setCubeName] = useState("");

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LogIn />} />
        <Route
          path='/home'
          element={
            <HomePage
              onCubeSelected={(cubeName) => {
                setCubeName(cubeName);
              }}
            />
          }
        />
        <Route path='/home/cubes/:id' element={<Cube cubeName={cubeName} />} />
      </Routes>
    </Router>
  );
}

export default App;
