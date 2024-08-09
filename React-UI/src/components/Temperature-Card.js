import React from "react";
import poza from "../1.jpg";

function TempCards({ error, data }) {
  return (
    <div class="frame">
      <div class="moon">
        <div class="moon-crater1"></div>
        <div class="moon-crater2"></div>
      </div>
      <div class="hill-bg-1"></div>
      <div class="hill-bg-2"></div>
      <div class="hill-fg-1"></div>
      <div class="hill-fg-2"></div>
      <div class="hill-fg-3"></div>

      <div class="front">
        <div>
          <div class="temperature">
            {error ? `Error: ${error}` : !data ? "Loading..." : data}°
          </div>
          <div class="icons">
            <i class="fas fa-wind"></i>
            <br />
            <i class="fas fa-tint"></i>
          </div>
          <div>
            <table class="preview">
              <tbody>
                <tr>
                  <td>Tue</td>
                  <td>21° | 9°</td>
                </tr>
                <tr>
                  <td>Wed</td>
                  <td>23° | 10°</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TempCards;
