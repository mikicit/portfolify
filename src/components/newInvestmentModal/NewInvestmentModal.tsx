import React, {useState, useRef} from 'react';
import {debounce, isEmpty} from 'lodash';
import styles from "./NewInvestmentModal.module.scss";

// Components
import Button from "../button/Button";

// Services
import PolygonAPI from "../../services/PolygonAPI";
import {generateColorFromString} from "../../util/util";
import {Investment} from "../../model/investment";

interface NewInvestmentModalProps {
    onClose: () => void;
    onSubmit: (investment: Investment) => void;
    isOpen: boolean;
    listName: string;
}

const NewInvestmentModal: React.FC<NewInvestmentModalProps> = ({onClose, onSubmit, isOpen, listName}) => {
    // State
    const [selectedInvestment, setSelectedInvestment] = useState<Investment>();
    const [symbol, setSymbol] = useState<string>('');
    const [recommendations, setRecommendations] = useState<any[]>([]);

    // Services
    const polygonAPI = PolygonAPI.polygonClient;

    const debouncedFetchRecommendationsResultsRef = useRef(debounce((searchSymbol: string) => {
        if (isEmpty(searchSymbol)) {
            setRecommendations([]);
            return;
        }

        polygonAPI.reference.tickers({
            search: searchSymbol,
            market: "stocks",
            type: "CS"
        }).then(r => {
            setRecommendations(r.results)
        })
    }, 500));

    // Handlers
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSymbol(event.target.value);
        debouncedFetchRecommendationsResultsRef.current(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (selectedInvestment) {
            onSubmit(selectedInvestment);
        }

        setSelectedInvestment(undefined);
        setSymbol('');
        setRecommendations([]);
        onClose();
    }

    const handleSelectSymbol = (symbol: string, name: string) => {
        polygonAPI.stocks.previousClose(symbol).then(r => {
            if (r.status === "OK" &&
                r.results !== undefined &&
                r.results.length > 0 &&
                r.results[0].c !== undefined &&
                r.results[0].o !== undefined) {
                setSelectedInvestment({
                    key: `${listName}-${symbol}`,
                    symbol: symbol,
                    price: r.results[0].c,
                    name: name,
                    change: +(r.results[0].c - r.results[0].o).toFixed(2),
                    changePercent: +((r.results[0].c - r.results[0].o) / r.results[0].o).toFixed(2)
                });
            } else {
                setSelectedInvestment(undefined);
            }
        })
    }

    return (
        <>
            {isOpen &&
                <div className={styles.container}>
                    <div className={styles.overlay}></div>
                    <div className={styles.content}>
                        <div className={styles.header}>
                            <h3 className={styles.heading}>{`New investment to ${listName}`}</h3>
                        </div>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            {selectedInvestment &&
                            <div className={styles.selectedInvestment}>
                                <article className={styles.investment}>
                                    {/* eslint-disable-next-line react/style-prop-object */}
                                    <span className={styles.investmentSymbol} style={
                                              {backgroundColor: generateColorFromString(selectedInvestment.symbol)}
                                          }>
                                        {selectedInvestment.symbol}
                                    </span>
                                    <h4 className={styles.investmentName}>{selectedInvestment.name}</h4>
                                    <div className={styles.investmentButton}>
                                        {/* eslint-disable-next-line react/style-prop-object */}
                                        <Button style="remove"
                                                name="Remove"
                                                type="button"
                                                size="small"
                                                onClick={() => setSelectedInvestment(undefined)}
                                        />
                                    </div>
                                </article>
                            </div>
                            }
                            <input className={styles.searchInput} type="text" name="newInvestment" value={symbol} onChange={handleChange} placeholder="Symbol (e.g. AAPL)" />
                            <div className={styles.recommendations}>
                                {recommendations.length > 0 ? (
                                    recommendations.map((recommendation) => (
                                        <article className={styles.investment} key={recommendation.ticker}>
                                            <span className={styles.investmentSymbol} style={
                                                {backgroundColor: generateColorFromString(recommendation.ticker)}
                                            }>
                                                {recommendation.ticker}
                                            </span>
                                            <h4 className={styles.investmentName}>{recommendation.name}</h4>
                                            <div className={styles.investmentButton}>
                                                <Button name="Select"
                                                        type="button"
                                                        size="small"
                                                        onClick={() => handleSelectSymbol(recommendation.ticker, recommendation.name)}
                                                />
                                            </div>
                                        </article>
                                    ))
                                ) : (
                                    <div>
                                        <p className={styles.recommendationsNotFound}>No recommendations found.</p>
                                    </div>
                                )}
                            </div>
                            <div className={styles.buttons}>
                                {/* eslint-disable-next-line react/style-prop-object */}
                                <Button name="Close" onClick={onClose} style="remove"/>
                                <Button name="Submit" type="submit" disabled={selectedInvestment == null}/>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    );
};

export default NewInvestmentModal;