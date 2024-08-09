import React, { useState, useEffect } from "react";

import "./App.css";
import poza from "./1.jpg";
import Button from "@mui/material/Button";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import FullBorderedGrid from "./components/BoxGrid";
import { LineGr } from "./components/Line";
import Cards from "./components/Cards";
import TempCards from "./components/Temperature-Card";
import OutlinedCard from "./components/Outlinecard";
import MediaControlCard from "./components/Mediacontrolapp";
function App() {
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);
  const [dataH, setData2H] = useState(null);
  const [lightState, setLightState] = useState("OFF");

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      fetch("/api/temp")
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => setData(data.payload))
        .catch((error) => {
          setError(error.toString());
        });
    };

    const fetchDataHumidity = () => {
      fetch("/api/Humd")
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((dataH) => setData2H(dataH.payload))
        .catch((error) => {
          setError(error.toString());
        });
    };
    fetchData();
    fetchDataHumidity();
    const intervalId = setInterval(fetchData, 500);
    const intervalId2 = setInterval(fetchDataHumidity, 500);

    // Clear interval on component unmount
    return () => {
      clearInterval(intervalId);
      clearInterval(intervalId2);
    };
  }, []);

  const handleButtonClick = () => {
    const newState = lightState === "ON" ? "OFF" : "ON";
    setLightState(newState);
    fetch("/api/light", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: newState }),
    })
      .then((response) => response.json())
      .then((data2) => console.log(data2))
      .catch((error) => {});
  };

  return (
    <>
      <div className="nav">
        <div className="nav-title">
          <h1>eSTC Smart-Home</h1>
        </div>
      </div>

      <div className="App">
        <div className="optiuni">
          <div>
            <Button variant="contained" color="primary">
              Home
            </Button>
          </div>
        </div>
        <div className="aici">
          {/* <FullBorderedGrid />*/}
          <div className="box"></div>
          <div className="grafice"></div>
          <div className="temperatura"></div>
          <div className="muzica"></div>
        </div>
        <div></div>

        {/*
        <div className="dateinmare">
          <MediaControlCard />
          <div className="linegr">{ <LineGr /> }</div>
          <div className="cards temp">
            { <TempCards error={error} data={data} /> }
          </div>
          <div className="cards light">
            {  <Cards
              handleButtonClick={handleButtonClick}
              lightState={lightState}
  /> }
          </div>
        </div>
*/}
      </div>
    </>
  );
}

export default App;
