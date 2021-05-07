/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import styles from "./DetailWeather.module.scss";
import { useHistory } from "react-router-dom";
import * as path from "../../constant/router";
type weatherCity = {
  icon: string;
  name: string;
  time: string;
  temp_min: number;
  temp_max: number;
  state: string;
  humidity: number;
};

type Props = {
  weather: weatherCity;
};

const DetailWeather: React.FC<Props> = ({ weather }) => {
  const history = useHistory();
  const urlIcon = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;
  return (
    <div
      className={styles.container}
      onClick={() => history.push(`${path.DASHBOARD}/${weather.name}`)}
    >
      <h4>{weather.name}</h4>
      <div className={styles.info}>
        <img src={urlIcon} />
        <div className={styles.content}>
          <p>{weather.time}</p>
          <p>
            {weather.temp_min}&#8451;/{weather.temp_max}&#8451;
          </p>
          <p>{weather.state}</p>
          <p>{weather.humidity}% Rain</p>
        </div>
      </div>
    </div>
  );
};

export default DetailWeather;
