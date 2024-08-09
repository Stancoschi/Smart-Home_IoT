import React from "react";
import poza from "../1.jpg";

import Button from "@mui/material/Button";

function Cards({ handleButtonClick, lightState }) {
  return (
    <div class="frame">
      <div class="moon">
        <div class="moon-crater1"></div>
        <div class="moon-crater2"></div>
      </div>

      <div class="front">
        <div>
          <div class="temperature">21°</div>
          <div class="icons">
            <i class="fas fa-wind"></i>
            <br />
            <i class="fas fa-tint"></i>
          </div>
          <div>
            <div class="info">
              <Button variant="contained" onClick={handleButtonClick}>
                Hello world
                {lightState}
              </Button>
              ;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
