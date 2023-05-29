import React, { useState } from "react";
import styles from "./Portfolios.module.scss";

// Types
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { addList, removeList, selectLastList } from "../../store/portfoliosSlice";
import store from "../../store/store";

// Components
import ListTabs from "../listTabs/ListTabs";
import Portfolio from "../portfolio/Portfolio";
import NewListModal from "../newListModal/NewListModal";
import Button from "../button/Button";
import Kitten from "../kitten/Kitten";

const Portfolios: React.FC = () => {
    const dispatch = useAppDispatch();
    const portfolios = useAppSelector((state) => state.portfolios);

    // State
    const [activeTab, setActiveTab] = useState<string>(portfolios.portfolios.length > 0 ? portfolios.portfolios[0].key : '');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const activePortfolio = portfolios.portfolios.find((portfolio) => portfolio.key === activeTab);

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
                newListButtonName="New portfolio"
                onNewList={handleNewList}
                list={portfolios.portfolios}
            />
            {activePortfolio !== null && activePortfolio !== undefined ? (
            <Portfolio
                portfolio={activePortfolio}
                onRemoveList={handleRemoveList} />
            ) : (
            <Kitten description={"You don't have portfolios yet, you can add the first one :)"}>
                <Button name="New portfolio" onClick={handleNewList} />
            </Kitten>
            )}
            <NewListModal onClose={() => setIsModalOpen(false)}
                          onSubmit={handleNewListSubmit}
                          heading="New portfolio"
                          placeholder="Portfolio name"
                          isOpen={isModalOpen} />
        </div>
    );
}

export default Portfolios;