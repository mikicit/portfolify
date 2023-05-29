import React from "react";
import kittenImage from "../../assets/kitten.png";
import styles from "./Kitten.module.scss";

interface KittenProps {
    description: string;
    children?: React.ReactNode;
}

const Kitten: React.FC<KittenProps> = ({description, children}) => {

    return (
        <div className={styles.container}>
            <img className={styles.image}
                 src={kittenImage}
                 alt="The kitty is perplexed"
                 width={512}
                 height={512}
            />
            <p className={styles.description}>{description}</p>
            <div className={styles.buttons}>
                {children}
            </div>
        </div>
    );
}

export default Kitten;