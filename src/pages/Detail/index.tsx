import React from "react";
import styles from "./Detail.module.scss";
import WeatherTime from "../../components/WeatherTime";
import iconCloud from "../../assets/cloud.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import * as api from "../../constant/api";
import moment from "moment";

type weatherTime = {
  time: string;
  state: string;
  icon: string;
  speedWind: number;
  humidity: number;
  temperature: number;
  precipitation: number;
};

const Detail = () => {
  const param = useParams<{ nameCity: string }>();
  const [indexFocus, setIndexFocus] = React.useState<number>(0);
  const [listWeatherTime, setListWeatherTime] = React.useState<weatherTime[]>([
    {
      time: "",
      state: "",
      icon: "",
      speedWind: 0,
      humidity: 0,
      temperature: 0,
      precipitation: 0,
    },
  ]);

  React.useEffect(() => {
    axios
      .get(`${api.API}forecast?q=${param.nameCity}&cnt=9&appid=${api.KEY}`)
      .then((res) => {
        setListWeatherTime(
          res.data.list.map((data: any) => {
            return {
              time: moment(data.dt * 1000).format("dddd, HH:MM"),
              state: data.weather[0].main,
              icon: data.weather[0].icon,
              speedWind: data.wind.speed,
              humidity: data.main.humidity,
              temperature: kelvinToCelsius(data.main.feels_like),
              precipitation: data.pop,
            };
          })
        );
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param.nameCity]);

  const kelvinToCelsius = (k: number) => {
    return (k - 273.15).toFixed(0);
  };
  const urlIcon =
    listWeatherTime[indexFocus].icon.length !== 0
      ? `http://openweathermap.org/img/wn/${listWeatherTime[indexFocus].icon}@2x.png`
      : iconCloud;

  return (
    <div className={styles.detailContainer}>
      <h1>{param.nameCity}</h1>
      <div className={styles.detailInfo}>
        <div>
          <p>{listWeatherTime[indexFocus].time}</p>
          <p>{listWeatherTime[indexFocus].state}</p>
        </div>
        <div>
          <p>Precipitation: {listWeatherTime[indexFocus].precipitation}% </p>
          <p>Humidity: {listWeatherTime[indexFocus].humidity}%</p>
          <p>Wind: {listWeatherTime[indexFocus].speedWind}km/h</p>
        </div>
      </div>
      <div className={styles.degrees}>
        <img src={urlIcon} alt="weather" />
        <span>{listWeatherTime[indexFocus].temperature}&#8451;</span>
      </div>
      <div className={styles.wrapperWeatherTime}>
        {listWeatherTime.map((weatherTime, index) => (
          <WeatherTime
            key={index}
            indexFocus={indexFocus}
            index={index}
            weather={weatherTime}
            onSetIndexFocus={setIndexFocus}
          />
        ))}
      </div>
      <Link to="/dashboard">
        <button className={styles.btnRedirect}>
          <span>&#10094;</span> Dashboard
        </button>
      </Link>
    </div>
  );
};

export default Detail;
