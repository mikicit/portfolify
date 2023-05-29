import styles from "./Header.module.scss";
import React from 'react';

// Components
import { ReactComponent as Logo } from "../../assets/logo.svg";

const Header: React.FC = () => {
    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Logo />
            </div>
        </div>
    );
};

export default Header;