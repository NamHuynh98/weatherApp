import React from "react";
import styles from "./TimeDetail.module.scss";
import iconCloud from "../../assets/cloud.svg";
import iconHumidity from "../../assets/humidity.svg";

type weatherTime = {
  time: string;
  state: string;
  icon: string;
  speedWind: number;
  humidity: number;
  temperature: number;
  precipitation: number;
};

type Props = {
  weather: weatherTime;
  index: number;
  indexFocus: number;
  onSetIndexFocus: (index: number) => void;
};

const WeatherTime: React.FC<Props> = ({
  weather,
  index,
  indexFocus,
  onSetIndexFocus,
}) => {
  const urlIcon =
    weather.icon.length !== 0
      ? `http://openweathermap.org/img/wn/${weather.icon}@2x.png`
      : iconCloud;
  return (
    <div
      className={`${styles.atomWeather} ${
        index === indexFocus && styles.active
      }`}
      onClick={() => onSetIndexFocus(index)}
    >
      <p>{weather.time.split(" ")[1]}</p>
      <img src={urlIcon} alt="weather" />
      <p>{weather.temperature}&#8451;</p>
      <div className={styles.humidity}>
        <img src={iconHumidity} alt="weather" />
        <span>{weather.humidity}%</span>
      </div>
    </div>
  );
};

export default WeatherTime;
