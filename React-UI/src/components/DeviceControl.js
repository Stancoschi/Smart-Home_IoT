// src/components/DeviceControl.js
import React, { useState } from "react";
import styled from "styled-components";
import MediaControlCard from "./Mediacontrolapp";
import BasicButtons from "./Button";
const DeviceControlContainer = styled.div`
  grid-column: 3 / span 1;
  grid-row: 2 / span 2;
  border-radius: 30px;
  background: #212121;
  box-shadow: 15px 15px 30px rgb(25, 25, 25), -15px -15px 30px rgb(60, 60, 60);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 1200px) {
    grid-column: 2 / span 1;
    grid-row: auto;
  }

  @media (max-width: 768px) {
    grid-column: 1 / span 1;
    grid-row: auto;
  }
`;

const Device = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: ${(props) => (props.on ? "#FF0035" : "#ccc")};
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

function DeviceControl() {
  const [lightState, setLightState] = useState("OFF");
  const [devices, setDevices] = useState({
    climate: true,
    ac: true,
    sound: false,
  });

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
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  const toggleDevice = (device) => {
    setDevices((prevDevices) => ({
      ...prevDevices,
      [device]: !prevDevices[device],
    }));
  };

  return (
    <DeviceControlContainer>
      <h2 style={{ color: "#fff" }}>My Devices</h2>
      <Device>
        <span style={{ color: "#fff" }}>Light</span>
        <Button on={lightState === "ON"} onClick={handleButtonClick}>
          {lightState}
        </Button>
      </Device>
      <Device>
        <span style={{ color: "#fff" }}>Climate</span>
        <Button on={devices.climate} onClick={() => toggleDevice("climate")}>
          {devices.climate ? "On" : "Off"}
        </Button>
      </Device>
      <Device>
        <span style={{ color: "#fff" }}>AC</span>
        <Button on={devices.ac} onClick={() => toggleDevice("ac")}>
          {devices.ac ? "On" : "Off"}
        </Button>
      </Device>
      <Device>
        <span style={{ color: "#fff" }}>Sound</span>
        <Button on={devices.sound} onClick={() => toggleDevice("sound")}>
          {devices.sound ? "On" : "Off"}
        </Button>
      </Device>
      <Device>
        <MediaControlCard />
      </Device>
    </DeviceControlContainer>
  );
}

export default DeviceControl;
