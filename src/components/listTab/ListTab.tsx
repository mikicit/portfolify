import React, {Component} from "react";
import styles from "./ListTab.module.scss";

interface GroupTabProps {
    name: string;
    tabKey: string;
    active: boolean;
    quantity: number;
    onClick: (tabKey: string) => void;
}

export default class ListTab extends Component<GroupTabProps> {
    handleClick = () => {
        const { tabKey, onClick } = this.props;
        onClick(tabKey);
    };

    render() {
        const { name, quantity, active } = this.props;

        return (
            <button className={`${styles.tab} ${active ? styles.active : ''}`} type="button" onClick={this.handleClick}>
                <span className={styles.text}>
                    {name}
                </span>
                <span className={styles.quantity}>
                    {quantity}
                </span>
            </button>
        );
    }
}