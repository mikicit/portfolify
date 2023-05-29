import styles from "./Tab.module.scss";
import React, {Component} from "react";

interface TabProps {
    name: string;
    tabKey: string;
    active: boolean;
    onClick: (tabKey: string) => void;
}

export default class Tab extends Component<TabProps> {
    handleClick = () => {
        const { tabKey, onClick } = this.props;
        onClick(tabKey);
    };

    render() {
        const className: string = styles.tab;
        const activeClassName: string = styles.active
        const { name, active } = this.props;

        return (
            <button className={`${className} ${active ? activeClassName : ''}`} onClick={this.handleClick} type="button" >
                {name}
            </button>
        );
    }
}