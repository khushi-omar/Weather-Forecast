

import React from "react";
import "./forecast.css";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Forecast = ({ data }) => {
  const dayInWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInWeek).concat(
    WEEK_DAYS.slice(0, dayInWeek)
  );

  return (
  <>
    <label className="title">Get your weekly data here!</label>
    <div className="forecast-grid">
      {data.forecastResponse.list.slice(0, 7).map((item, idx) => {
        // Determine card background based on weather condition
        let weatherClass = "";
        const condition = item.weather[0].main.toLowerCase();
        if (condition.includes("clear")) {
          weatherClass = "sunny-card";
        } else if (condition.includes("cloud")) {
          weatherClass = "cloudy-card";
        } else if (condition.includes("rain")) {
          weatherClass = "rainy-card";
        }else if (condition.includes("clear sky")) {
          weatherClass = "clear-sky-card";
        }

        return (
          <div key={idx} className={`forecast-card ${weatherClass}`}>
            <div className="forecast-header">
              <img
                alt="weather"
                className="icon-small"
                src={`icons/${item.weather[0].icon}.png`}
              />
              <div>
                <div className="day">{forecastDays[idx]}</div>
                <div className="description">{item.weather[0].description}</div>
              </div>
            </div>
            <div className="min-max">
              {Math.round(item.main.temp_min)}°C /{" "}
              {Math.round(item.main.temp_max)}°C
            </div>
            <div className="daily-details-grid">
              <div className="daily-details-grid-item">
                <label>Pressure</label>
                <label>{item.main.pressure} Pa</label>
              </div>
              <div className="daily-details-grid-item">
                <label>Humidity</label>
                <label>{item.main.humidity}%</label>
              </div>
              <div className="daily-details-grid-item">
                <label>Clouds</label>
                <label>{item.clouds.all}%</label>
              </div>
              <div className="daily-details-grid-item">
                <label>Wind Speed</label>
                <label>{item.wind.speed} m/s</label>
              </div>
              <div className="daily-details-grid-item">
                <label>Sea Level</label>
                <label>{item.main.sea_level} m</label>
              </div>
              <div className="daily-details-grid-item">
                <label>Feels Like</label>
                <label>{Math.round(item.main.feels_like)}°C</label>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </>
);
}

export default Forecast;
