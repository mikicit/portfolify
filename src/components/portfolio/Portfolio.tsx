import React, {useState} from "react";
import styles from "./Portfolio.module.scss";

import { useAppDispatch } from "../../store/hook";
import {addInvestment} from "../../store/portfoliosSlice";

// Models
import {Portfolio as PortfolioType, PortfolioInvestment} from "../../model/portfolio";

// Components
import Button from "../button/Button";
import PortfolioItem from "../portfolioItem/PortfolioItem";
import NewInvestmentModal from "../newInvestmentModal/NewInvestmentModal";
import {Investment} from "../../model/investment";
import Kitten from "../kitten/Kitten";

interface PortfolioProps {
    portfolio: PortfolioType;
    onRemoveList: (key: string) => void;
}

const Portfolio: React.FC<PortfolioProps> = ({portfolio, onRemoveList}) => {
    const dispatch = useAppDispatch();

    // State
    const [isNewInvestmentModalOpen, setNewInvestmentModelOpen] = useState<boolean>(false);

    // Handlers
    const handleNewInvestmentSubmit = (investment: Investment) => {
        dispatch(addInvestment({
            portfolioKey: portfolio.key,
            investment: {
                ...investment,
                purchases: [],
            } as PortfolioInvestment,
        }));
        setNewInvestmentModelOpen(false);
    }

    return (
        <article className={styles.content}>
            <h1 className={styles.title}>{portfolio.name}</h1>
            {portfolio.data.length !== 0 ? (
                <>
                <div className={styles.table}>
                    <div className={styles.header}>
                        <div className={styles.symbolHeaderLayout}>
                            <span className={`${styles.symbolHeader} ${styles.headerTitle}`}>Symbol</span>
                        </div>
                        <div className={styles.nameHeaderLayout}>
                            <span className={styles.headerTitle}>Name</span>
                        </div>
                        <div className={styles.priceHeaderLayout}>
                            <span className={styles.headerTitle}>Price</span>
                        </div>
                        <div className={styles.quantityHeaderLayout}>
                            <span className={styles.headerTitle}>Quantity</span>
                        </div>
                        <div className={styles.changeHeaderLayout}>
                            <span className={styles.headerTitle}>Day gain</span>
                        </div>
                        <div className={styles.valueHeaderLayout}>
                            <span className={styles.headerTitle}>Value</span>
                        </div>
                        <div className={styles.buttonsHeaderLayout}>
                            <span className={styles.headerButtons}>Buttons</span>
                        </div>
                    </div>
                    <div className={styles.tableItems}>
                        {portfolio.data.map((investment) => (
                            <PortfolioItem key={investment.key} investment={investment} portfolioKey={portfolio.key} />
                        ))}
                    </div>
                </div>
                <div className={styles.footer}>
                    <Button name="New investment" onClick={() => setNewInvestmentModelOpen(true)} />
                    {/* eslint-disable-next-line react/style-prop-object */}
                    <Button name="Remove portfolio" style="remove" onClick={() => onRemoveList(portfolio.key)} />
                </div>
                </>
            ) : (
                <Kitten description={"You don't have any investments added yet, you can add a new one :)"}>
                    <Button name="New investment" onClick={() => setNewInvestmentModelOpen(true)} />
                    {/* eslint-disable-next-line react/style-prop-object */}
                    <Button name="Remove portfolio" style="remove" onClick={() => onRemoveList(portfolio.key)} />
                </Kitten>
            )}
            <NewInvestmentModal
                onClose={() => setNewInvestmentModelOpen(false)}
                onSubmit={handleNewInvestmentSubmit}
                isOpen={isNewInvestmentModalOpen}
                listName={portfolio.name} />
        </article>
    );
}

export default Portfolio;