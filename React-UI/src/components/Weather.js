// src/components/Weather.js
import React from "react";
import styled from "styled-components";
import { WiDaySunny, WiRain, WiStormShowers } from "weather-icons-react";
const key = "fc575e3204194dfca68162925240704";
const WeatherContainer = styled.div`
  grid-column: 2 / span 2;
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

const TodayWeather = styled.div`
  display: flex;
  align-items: center;
`;

const Forecast = styled.div`
  margin-top: 20px;
  color: #fff;
`;

const WeatherIcon = styled.div`
  margin-right: 20px;
  color: #fff;
`;

const ForecastItem = styled.div`
  display: flex;
  justify-content: space-between;s
`;

function Weather() {
  return (
    <WeatherContainer>
      <h2 style={{ color: "#fff" }}>Today</h2>
      <TodayWeather>
        <WeatherIcon>
          <WiDaySunny size={64} color="#FF0035" />
        </WeatherIcon>
        <div>
          <p style={{ color: "#fff" }}>23°C / 13°C</p>
          <p style={{ color: "#fff" }}>A sun with a cool</p>
        </div>
      </TodayWeather>
      <Forecast>
        <h3>Forecast</h3>
        <ForecastItem>
          <span>Tomorrow: </span>
          <span>
            <WiRain size={24} color="#FF0035" /> 20°C / 18°C
          </span>
        </ForecastItem>
        <ForecastItem>
          <span>Wednesday: </span>
          <span>
            <WiStormShowers size={24} color="#003049" /> 16°C / 10°C
          </span>
        </ForecastItem>
        <ForecastItem>
          <span>Thursday: </span>
          <span>
            <WiRain size={24} color="#003049" /> 17°C / 9°C
          </span>
        </ForecastItem>
      </Forecast>
    </WeatherContainer>
  );
}

export default Weather;
