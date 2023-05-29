import React, { useState } from 'react';
import styles from './App.module.scss';

// Layout
import Header from "../header/Header";
import Tabs from "../tabs/Tabs";
import TabContent from "../tabContent/TabContent";
import {useAppDispatch} from "../../store/hook";

interface TabType {
    name: string,
    tabKey: string
}

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState('watchlists');

    const tabs: TabType[] = [
        { name: 'Watchlists', tabKey: 'watchlists' },
        { name: 'Portfolios', tabKey: 'portfolios' },
    ];

    // Start updates
    // useEffect(() => {
    //     dispatch({ type: 'watchlists/startWatchlistsUpdates' })
    //     dispatch({ type: 'portfolios/startPortfoliosUpdates' })
    // }, [dispatch]);


    // Handlers
    const handleTabChange = (tabKey: string) => {
        setActiveTab(tabKey);
    }

    return (
        <div className={styles.app}>
            <Header />
            <div className={styles.container}>
                <Tabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
                <TabContent activeTab={activeTab} />
            </div>
        </div>
    );
}

export default App;