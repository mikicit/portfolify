import styles from "./Tabs.module.scss";
import React, {Component} from "react";

// Components
import Tab from "../tab/Tab";

interface TabType {
    name: string,
    tabKey: string
}

interface TabsProps {
    tabs: TabType[];
    activeTab: string;
    onTabChange: (tabKey: string) => void;
}

export default class Tabs extends Component<TabsProps> {

    render() {
        const className: string = styles.tabs;
        const { tabs, onTabChange, activeTab } = this.props;

        return (
            <div className={className}>
                {tabs.map((tab) => (
                    <Tab
                        key={tab.tabKey}
                        name={tab.name}
                        tabKey={tab.tabKey}
                        active={activeTab === tab.tabKey}
                        onClick={onTabChange}
                    />
                ))}
            </div>
        );
    }
}