import React from "react";
import styles from "./ModalAddCity.module.scss";
import iconPlus from "../../assets/add.svg";
import iconSearch from "../../assets/search.svg";

type Props = {
  onClose: () => void;
  onSendCity: (name: string) => void;
  error: boolean;
};

const ModalAddCity: React.FC<Props> = ({ onClose, onSendCity, error }) => {
  const [nameCity, setNameCity] = React.useState("");

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <span>Choose a city</span>
          <img src={iconPlus} alt="close" onClick={() => {
            onClose();
            setNameCity("")
          }} />
        </div>
        <div className={styles.content}>
          <div className={styles.inputSearch}>
            <input type="text" onChange={(e) => setNameCity(e.target.value)} />
            <img className={styles.iconSearch} src={iconSearch} alt="search" />
          </div>
          {error && <div className={styles.error}>error</div>}
        </div>
        <div className={styles.actions}>
          <button onClick={() => { onClose(); setNameCity("") }}> Cancel </button>
          <button
            onClick={() => {
              onSendCity(nameCity);
              setNameCity("");
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddCity;
