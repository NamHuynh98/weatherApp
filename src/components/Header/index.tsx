import React from 'react'
import styles from './Header.module.scss'
import logo from '../../assets/cloudy-day.svg';

const Header = () => {
    return (
        <div className={styles.headerContainer}>
            <img src={logo} />
            <span>Weather Online</span>
        </div>
    )
}


export default Header;

