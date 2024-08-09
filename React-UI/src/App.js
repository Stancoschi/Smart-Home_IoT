// src/App.js

import styled from "styled-components";
import Header from "./components/Header";
import Weather from "./components/Weather";
import EnergySaving from "./components/EnergySaving";
import DeviceControl from "./components/DeviceControl";
import TemperatureControl from "./components/TemperatureControl";
import React, { useState, useEffect } from "react";

// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization

const Dashboard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: 20px;
  margin-top: 20px;
  background-color: #111 @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-column: 1 / span 1;
  }
`;

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
    <div className="App ">
      <Header />
      <Dashboard>
        <Weather />
        <TemperatureControl data={data} />
        <EnergySaving />
        <DeviceControl handleButtonClick={handleButtonClick} />
      </Dashboard>
    </div>
  );
}

export default App;
