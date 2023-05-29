import React from "react";
import styles from "./ListTabs.module.scss";

// Models
import { Watchlist } from "../../model/watchlist";
import { Portfolio } from "../../model/portfolio";

// Components
import ListTab from "../listTab/ListTab";
import Button from "../button/Button";

interface ListTabsProps {
    activeTab: string;
    onTabChange: (tabKey: string) => void;
    newListButtonName: string;
    onNewList: () => void;
    list: Watchlist[] | Portfolio[] | [];
}

const ListTabs: React.FC<ListTabsProps> = ({ activeTab, list, onTabChange, onNewList, newListButtonName }) => {
    return (
        <>
        {list.length > 0 && (
            <div className={styles.tabs}>
                {list.map((tab) => (
                    <ListTab
                        key={tab.key}
                        name={tab.name}
                        tabKey={tab.key}
                        quantity={tab.data.length}
                        active={activeTab === tab.key}
                        onClick={onTabChange}
                    />
                ))}
                <div className={styles.button}>
                    <Button name={newListButtonName} onClick={onNewList} />
                </div>
            </div>
        )}
        </>
    );
}

export default ListTabs;