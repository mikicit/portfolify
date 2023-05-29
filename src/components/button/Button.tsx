import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
    name: string;
    onClick?: () => void;
    style?: "primary" | "remove";
    type?: "button" | "submit";
    size?: "small";
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({name, onClick, style, type, disabled, size}) => {
    const buttonStyle = style ? styles[style] : styles.primary;
    const buttonSize = size ? styles[size] : "";
    const buttonType = type ? type : "button";

    return (
        <button
            className={`${buttonStyle} ${buttonSize}`}
            onClick={onClick}
            type={buttonType}
            disabled={disabled}>
            {name}
        </button>
    );
}

export default Button;
