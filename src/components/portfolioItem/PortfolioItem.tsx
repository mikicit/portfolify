import React, { useState } from "react";
import styles from "./PortfolioItem.module.scss";

import { useAppDispatch } from "../../store/hook";
import { removeInvestment, removePurchase, addPurchase } from "../../store/portfoliosSlice";

// Models
import { PortfolioInvestment, PortfolioPurchase } from "../../model/portfolio";

// Components
import { ReactComponent as DeleteIcon } from '../../assets/delete.svg';
import { ReactComponent as AddIcon } from '../../assets/add.svg';
import { ReactComponent as ExpandMoreIcon } from '../../assets/expand-more.svg';

// Utils
import { generateColorFromString } from "../../util/util";
import cx from "classnames";
import NewPurchaseModal from "../newPurchaseModal/NewPurchaseModal";

interface PortfolioItemProps {
    investment: PortfolioInvestment;
    portfolioKey: string;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({portfolioKey, investment}) => {
    const dispatch = useAppDispatch();

    // State
    const [isNewPurchaseModalOpen, setNewPurchaseModalOpen] = useState<boolean>(false);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    // Calculations
    const totalQuantity = investment.purchases.reduce((acc, curr) => acc + curr.quantity, 0);
    const totalValue = investment.price * totalQuantity;
    const totalChange = investment.changePercent * totalValue;

    const calculatePurchaseValue = (purchase: PortfolioPurchase) => {
        return investment.price * purchase.quantity;
    }

    const calculatePurchaseChange = (purchase: PortfolioPurchase) => {
        return purchase.quantity * (investment.price - purchase.price);
    }

    const calculatePurchaseChangePercentage = (purchase: PortfolioPurchase) => {
        return investment.price / purchase.price * 100 - 100;
    }

    const toggleIsExpanded = () => {
        setIsExpanded(!isExpanded);
    }

    // Handlers
    const handleAddPurchase = (purchase: PortfolioPurchase) => {
        dispatch(addPurchase({portfolioKey: portfolioKey, investmentKey: investment.key, purchase: purchase}));
        setNewPurchaseModalOpen(false);
    }

    return (
        <article className={styles.item} key={investment.key}>
            <div className={styles.main}>
                <div className={styles.symbolLayout}>
                    <span className={styles.label}>Symbol:</span>
                    <span className={styles.symbol} style={
                        {backgroundColor: generateColorFromString(investment.symbol)}
                    }>
                        {investment.symbol}
                    </span>
                </div>
                <div className={styles.nameLayout}>
                    <span className={styles.label}>Name:</span>
                    <h2 className={styles.name}>{investment.name}</h2>
                </div>
                <div className={styles.priceLayout}>
                    <span className={styles.label}>Price:</span>
                    <span className={styles.parameter}>{investment.price}</span>
                </div>
                <div className={styles.quantityLayout}>
                    <span className={styles.label}>Quantity:</span>
                    <span className={styles.parameter}>{totalQuantity}</span>
                </div>
                <div className={styles.changeLayout}>
                    <span className={styles.label}>Day gain:</span>
                    <span className={cx(styles.parameter, {
                        [styles.negativeChange]: investment.change < 0,
                        [styles.positiveChange]: investment.change > 0
                    })}>
                        {totalChange.toFixed(2)} / {investment.changePercent}%
                    </span>
                </div>
                <div className={styles.valueLayout}>
                    <span className={styles.parameter}>{totalValue.toFixed(2)}</span>
                </div>
                <div className={styles.buttonsLayout}>
                    <button className={styles.button} type="button"
                            onClick={() => dispatch(removeInvestment({portfolioKey: portfolioKey, investmentKey: investment.key}))}>
                        <DeleteIcon/>
                    </button>
                    <button className={styles.button} type="button" onClick={() => setNewPurchaseModalOpen(true)}><AddIcon/></button>
                    <button className={cx(styles.button, {
                            [styles.isExpanded]: isExpanded
                        })}
                            type="button" onClick={toggleIsExpanded}>
                        <ExpandMoreIcon/>
                    </button>
                </div>
            </div>
            {isExpanded && (
                <div className={styles.purchases}>
                    {investment.purchases.length !== 0 ? (
                        <div className={styles.purchaseTable}>
                            <div className={styles.purchaseTableHeader}>
                                <div className={styles.purchaseTableHeaderDateLayout}>
                                    <span className={styles.purchaseTableHeaderTitle}>Purchase date</span>
                                </div>
                                <div className={styles.purchaseTableHeaderPriceLayout}>
                                    <span className={styles.purchaseTableHeaderTitle}>Purchase price</span>
                                </div>
                                <div className={styles.purchaseTableHeaderQuantityLayout}>
                                    <span className={styles.purchaseTableHeaderTitle}>Quantity</span>
                                </div>
                                <div className={styles.purchaseTableHeaderChangeLayout}>
                                    <span className={styles.purchaseTableHeaderTitle}>Total gain</span>
                                </div>
                                <div className={styles.purchaseTableHeaderValueLayout}>
                                    <span className={styles.purchaseTableHeaderTitle}>Value</span>
                                </div>
                                <div className={styles.purchaseTableHeaderButtonLayout}>
                                    <span className={styles.purchaseTableHeaderButton}>Buttons</span>
                                </div>
                            </div>
                            {investment.purchases.map((purchase) => (
                            <article className={styles.purchase} key={purchase.key}>
                                <div className={styles.purchaseDateLayout}>
                                    <span className={styles.label}>Purchase date:</span>
                                    <span className={styles.purchaseParameter}>{purchase.date}</span>
                                </div>
                                <div className={styles.purchasePriceLayout}>
                                    <span className={styles.label}>Purchase price:</span>
                                    <span className={styles.purchaseParameter}>{purchase.price}</span>
                                </div>
                                <div className={styles.purchaseQuantityLayout}>
                                    <span className={styles.label}>Quantity:</span>
                                    <span className={styles.purchaseParameter}>{purchase.quantity}</span>
                                </div>
                                <div className={styles.purchaseChangeLayout}>
                                    <span className={styles.label}>Total gain:</span>
                                    <span className={cx(styles.purchaseParameter, {
                                        [styles.negativeChange]: calculatePurchaseChange(purchase) < 0,
                                        [styles.positiveChange]: calculatePurchaseChange(purchase) > 0
                                    })}>
                                        {`${calculatePurchaseChange(purchase).toFixed(2)} / 
                                        ${calculatePurchaseChangePercentage(purchase).toFixed(2)}%`}
                                    </span>
                                </div>
                                <div className={styles.purchaseValueLayout}>
                                    <span className={styles.label}>Value:</span>
                                    <span className={styles.purchaseParameter}>
                                        {calculatePurchaseValue(purchase).toFixed(2)}
                                    </span>
                                </div>
                                <div className={styles.purchaseButtonLayout}>
                                    <button className={styles.button}
                                            type="button"
                                            onClick={() => dispatch(removePurchase({
                                                portfolioKey: portfolioKey,
                                                investmentKey: investment.key,
                                                purchaseKey: purchase.key
                                            }))}>
                                        <DeleteIcon/>
                                    </button>
                                </div>
                            </article>
                            ))}
                        </div>
                    ) : (
                        <div>
                            <p className={styles.emptyPurchases}>No purchases yet.</p>
                        </div>
                    )}
                </div>
            )}
            <NewPurchaseModal
                onClose={() => setNewPurchaseModalOpen(false)}
                onSubmit={handleAddPurchase}
                isOpen={isNewPurchaseModalOpen}
                investment={investment}
                 />
        </article>
    );
}

export default PortfolioItem;