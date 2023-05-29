import React, { useState  } from "react";
import styles from "./Watchlists.module.scss";

import store from "../../store/store";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { addList, removeList, selectLastList } from "../../store/watchlistsSlice";


// Components
import ListTabs from "../listTabs/ListTabs";
import Watchlist from "../watchlist/Watchlist";
import NewListModal from "../newListModal/NewListModal";
import Kitten from "../kitten/Kitten";
import Button from "../button/Button";

const Watchlists: React.FC = () => {
    const dispatch = useAppDispatch();
    const watchlists = useAppSelector((state) => state.watchlists);

    // State
    const [activeTab, setActiveTab] = useState<string>(watchlists.watchlists.length > 0 ? watchlists.watchlists[0].key : '');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const activeWatchlist = watchlists.watchlists.find((watchlist) => watchlist.key === activeTab);

    const handleTabChange = (tabKey: string) => {
        setActiveTab(tabKey);
    };

    const handleNewList = () => {
        setIsModalOpen(true);
    }

    const handleNewListSubmit = (name: string) => {
        dispatch(addList(name));

        const lastAddedList = selectLastList(store.getState());
        if (lastAddedList) {
            setActiveTab(lastAddedList.key);
        }

        setIsModalOpen(false);
    }

    const handleRemoveList = (key: string) => {
        dispatch(removeList(key));

        const lastAddedList = selectLastList(store.getState());
        if (lastAddedList) {
            setActiveTab(lastAddedList.key);
        }
    };

    return (
        <div className={styles.container}>
             <ListTabs
                activeTab={activeTab}
                onTabChange={handleTabChange}
                newListButtonName="New watchlist"
                onNewList={handleNewList}
                list={watchlists.watchlists}
            />
            {activeWatchlist !== null && activeWatchlist !== undefined ? (
            <Watchlist
                watchlist={activeWatchlist}
                onRemoveList={handleRemoveList}
            />
            ) : (
            <Kitten description={"You don't have watchlists yet, you can add the first one :)"}>
                <Button name="New watchlist" onClick={handleNewList} />
            </Kitten>
            )}
            <NewListModal onClose={() => setIsModalOpen(false)}
                          onSubmit={handleNewListSubmit}
                          heading="New watchlist"
                          placeholder="Watchlist name"
                          isOpen={isModalOpen} />
        </div>
    );
}

export default Watchlists;