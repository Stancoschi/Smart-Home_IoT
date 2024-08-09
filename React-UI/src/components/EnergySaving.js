// src/components/EnergySaving.js
import React from "react";
import styled from "styled-components";
import { LineGr } from "./Line";
const EnergySavingContainer = styled.div`
  grid-column: 1 / span 2;
  grid-row: 2 / span 2;
  border-radius: 30px;
  background: #212121;
  box-shadow: 15px 15px 30px rgb(25, 25, 25), -15px -15px 30px rgb(60, 60, 60);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 1200px) {
    grid-column: 1 / span 2;
  }

  @media (max-width: 768px) {
    grid-column: 1 / span 1;
  }
`;

function EnergySaving() {
  return (
    <EnergySavingContainer>
      <h2 style={{ color: "#fff" }}>Energy Saving</h2>
      <div style={{ height: "500px" }}>
        <LineGr />
      </div>
    </EnergySavingContainer>
  );
}

export default EnergySaving;
