import React, {Component} from "react";
import styles from "./TabContent.module.scss";

// Components
import Watchlists from "../watchlists/Watchlists";
import Portfolios from "../portfolios/Portfolios";

interface TabContentProps {
    activeTab: string;
}

export default class TabContent extends Component<TabContentProps> {

    render() {
        const className: string = styles.tabContent;
        const { activeTab } = this.props

        return (
            <div className={className}>
                {activeTab === 'watchlists' ? <Watchlists /> : <Portfolios />}
            </div>
        );
    }
}