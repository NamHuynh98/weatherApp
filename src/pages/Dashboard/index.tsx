import React from "react";
import DetailWeather from "../../components/DetailWeather";
import styles from "./Dashboard.module.scss";
import iconPlus from "../../assets/add.svg";
import ModalAddCity from "../../components/ModalAddCity";
import * as api from "../../constant/api";
import axios from "axios";
import { ListCityContext } from "../../App";
import moment from "moment";
const Dashboard = () => {
  const city = React.useContext(ListCityContext);

  const [isShowModal, setIsShowModal] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [listWeatherCity, setListWeatherCity] = React.useState<
    {
      name: string;
      time: string;
      temp_min: number;
      temp_max: number;
      state: string;
      humidity: number;
      icon: string;
    }[]
  >([]);

  const handleLoadCity = (nameCity: string) => {
    city.setListCity([...city.listCity, nameCity]);

  };

  React.useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city.listCity]);

  const loadData = async () => {
    const promises = city.listCity.map((item: string) => loadWeather(item));
    await Promise.all(promises)
      .then((result) => {
        localStorage.setItem(
          "store_weathers",
          JSON.stringify(city.listCity)
        );
        setIsShowModal(false);
        setListWeatherCity([
          ...result.map((res: any) => ({
            name: res.data.name,
            time: `${moment(res.data.dt * 1000).format("dddd, DD.MM.YY")}`,
            temp_min: Number(kelvinToCelsius(res.data.main.temp_min)),
            temp_max: Number(kelvinToCelsius(res.data.main.temp_max)),
            state: res.data.weather[0].main,
            humidity: res.data.main.humidity,
            icon: res.data.weather[0].icon,
          })),
        ]);
      })
      .catch((error) => {
        setIsError(true);
        let arr = city.listCity;
        arr.pop();
        city.setListCity([...arr]);
      });
  };

  const loadWeather = async (city: string) =>
    axios.get(`${api.API}weather?q=${city}&appid=${api.KEY}`);

  const kelvinToCelsius = (k: number) => {
    return (k - 273.15).toFixed(0);
  };

  return (
    <>
      <div className={styles.wrapperCard}>
        {listWeatherCity.map((city, index) => (
          <DetailWeather key={index} weather={city} />
        ))}

        <div
          className={styles.cardAddCity}
          onClick={() => setIsShowModal(true)}
        >
          <img src={iconPlus} alt="icon add" />
          <span>Add City</span>
        </div>
      </div>
      {isShowModal && (
        <ModalAddCity
          onClose={() => {
            setIsShowModal(!isShowModal);
            setIsError(false);
          }}
          onSendCity={handleLoadCity}
          error={isError}
        />
      )}
    </>
  );
};

export default Dashboard;
