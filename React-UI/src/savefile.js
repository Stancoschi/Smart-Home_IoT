import React, { useState, useEffect } from "react";
import Cards from "./components/Cards";
import TempCards from "./components/Temperature-Card";
import "./App.css";
import poza from "./1.jpg";

import { LineGr } from "./components/Line";

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
          console.error("Error fetching data: ", error);
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
          console.error("Error fetching data: ", error);
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
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="nav">
        <div className="nav-title">
          <h1>eSTC Smart-Home</h1>
        </div>
      </div>

      <div className="App">
        <div className="temp-parinte">
          <div className="a">
            <div className="graph-grid-container">
              <div className="graph-grid-item">
                <LineGr />
              </div>
            </div>
            <div className="grid-container">
              <div className="grid-item">
                <TempCards error={error} data={data} />
                <img src={poza} alt="poza" />
              </div>
              <div className="grid-item">
                <Cards
                  handleButtonClick={handleButtonClick}
                  lightState={lightState}
                />
                <img />
              </div>
            </div>
          </div>
        </div>
        <div className="grid-container">
          <div className="grid-item">
            <img src={poza} alt="poza" />
            <button className="button"> Button 3</button>
          </div>
          <div className="grid-item">
            <img src={poza} alt="poza" />
            <button>Button 4</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
