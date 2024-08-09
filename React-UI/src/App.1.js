import React, { useState, useEffect } from "react";
import poza from "./1.jpg";
import { LineGr } from "./components/Line";

export function App() {
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
        <div>
          <div className="graph-grid-container">
            <div className="graph-grid-item">
              <LineGr />
            </div>
          </div>
          <div className="grid-container"></div>
          <div className="ControlButtons"></div>
        </div>

        <div className="grid-container">
          <div className="grid-item">
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
            <img src={poza} alt="poza" />
            <button className="button">
              {error ? `Error: ${error}` : !data ? "Loading..." : data}
            </button>
          </div>

          <div className="grid-item">
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
                      <button className="button" onClick={handleButtonClick}>
                        {lightState}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <img src={poza} alt="poza" />
          </div>

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
