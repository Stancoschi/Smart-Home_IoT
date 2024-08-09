// src/components/TemperatureControl.js
import React from "react";
import styled from "styled-components";

const TemperatureControlContainer = styled.div`
  grid-column: 1 / span 1;
  grid-row: 1 / span 1;
  border-radius: 30px;
  background: #212121;
  box-shadow: 15px 15px 30px rgb(25, 25, 25), -15px -15px 30px rgb(60, 60, 60);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 1200px) {
    grid-column: 2 / span 1;
  }

  @media (max-width: 760px) {
    grid-column: 1 / span 2;
  }
`;

const TempDisplay = styled.div`
  font-size: 2em;
  margin-bottom: 20px;
  color: #ffffff;
`;

const TempSettings = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
`;

function TemperatureControl({ data }) {
  return (
    <TemperatureControlContainer>
      <h2 style={{ color: "#ffffff" }}>Temperature</h2>
      <TempDisplay>{data && data ? `${data}°C` : "Loading..."}</TempDisplay>
      <TempSettings>
        <div>10:30 PM to 02:30 AM</div>
        <div>Indoor: 18°C, Outdoor: 22°C</div>
      </TempSettings>
    </TemperatureControlContainer>
  );
}

export default TemperatureControl;
