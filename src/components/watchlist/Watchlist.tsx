import React, { useState } from "react";
import styles from "./Watchlist.module.scss";
import cx from "classnames";

import { useAppDispatch } from "../../store/hook";
import { removeItem, addItem } from "../../store/watchlistsSlice";

// Models
import {Watchlist as WatchlistType, WatchlistInvestment} from "../../model/watchlist";

// Components
import Button from "../button/Button";
import { ReactComponent as DeleteIcon } from '../../assets/delete.svg';
import NewInvestmentModal from "../newInvestmentModal/NewInvestmentModal";

// Utils
import {generateColorFromString} from "../../util/util";
import {Investment} from "../../model/investment";
import Kitten from "../kitten/Kitten";

interface WatchlistProps {
    watchlist: WatchlistType;
    onRemoveList: (key: string) => void;
}

const Watchlist: React.FC<WatchlistProps> = ({watchlist, onRemoveList}) => {
    const dispatch = useAppDispatch();

    // State
    const [isNewInvestmentModalOpen, setNewInvestmentModelOpen] = useState<boolean>(false);

    // Handlers
    const handleNewInvestmentSubmit = (investment: Investment) => {
        dispatch(addItem({
            watchlistKey: watchlist.key,
            investment: investment as WatchlistInvestment
        }));
        setNewInvestmentModelOpen(false);
    }

    return (
        <article className={styles.content}>
            <h1 className={styles.title}>{watchlist.name}</h1>
            {watchlist.data.length !== 0 ? (
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
                        <div className={styles.changeHeaderLayout}>
                            <span className={styles.headerTitle}>Day gain</span>
                        </div>
                        <div className={styles.buttonsHeaderLayout}>
                            <span className={styles.headerButtons}>Buttons</span>
                        </div>
                    </div>
                    <div className={styles.tableItems}>
                    {watchlist.data.map((item) => (
                        <article className={styles.item} key={item.key}>
                            <div className={styles.symbolLayout}>
                                <span className={styles.label}>Symbol:</span>
                                <span className={styles.symbol} style={
                                    {backgroundColor: generateColorFromString(item.symbol)}
                                }>
                                    {item.symbol}
                                </span>
                            </div>
                            <div className={styles.nameLayout}>
                                <span className={styles.label}>Name:</span>
                                <h2 className={styles.name}>{item.name}</h2>
                            </div>
                            <div className={styles.priceLayout}>
                                <span className={styles.label}>Price:</span>
                                <span className={styles.parameter}>{item.price}</span>
                            </div>
                            <div className={styles.changeLayout}>
                                <span className={styles.label}>Day gain:</span>
                                <span className={cx(styles.parameter, {
                                    [styles.negativeChange]: item.change < 0,
                                    [styles.positiveChange]: item.change > 0
                                })}>
                                    {item.change} / {item.changePercent}%
                                </span>
                            </div>
                            <div className={styles.buttonsLayout}>
                                <button className={styles.button} type="button"
                                    onClick={() => dispatch(removeItem({
                                    watchlistKey: watchlist.key,
                                    investmentKey: item.key
                                }))}>
                                    <DeleteIcon/>
                                </button>
                            </div>
                        </article>
                    ))}
                    </div>
                </div>
                <div className={styles.footer}>
                    <Button name="New investment" onClick={() => setNewInvestmentModelOpen(true)} />
                    {/* eslint-disable-next-line react/style-prop-object */}
                    <Button name="Remove watchlist" style="remove" onClick={() => onRemoveList(watchlist.key)} />
                </div>
                </>
                ) : (
                    <Kitten description={"You don't have any investments added yet, you can add a new one :)"}>
                        <Button name="New investment" onClick={() => setNewInvestmentModelOpen(true)} />
                        {/* eslint-disable-next-line react/style-prop-object */}
                        <Button name="Remove watchlist" style="remove" onClick={() => onRemoveList(watchlist.key)} />
                    </Kitten>
                )}
                <NewInvestmentModal
                    onClose={() => setNewInvestmentModelOpen(false)}
                    onSubmit={handleNewInvestmentSubmit}
                    isOpen={isNewInvestmentModalOpen}
                    listName={watchlist.name}
                />
            </article>
    );
}

export default Watchlist;