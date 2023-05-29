import React, { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import styles from "./NewPurchaseModal.module.scss";

// Models
import {PortfolioInvestment, PortfolioPurchase} from "../../model/portfolio";

// Components
import Button from "../button/Button";
import PolygonAPI from "../../services/PolygonAPI";

interface NewPurchaseModalProps {
    onClose: () => void;
    onSubmit: (investment: PortfolioPurchase) => void;
    isOpen: boolean;
    investment: PortfolioInvestment;
}

const NewPurchaseModal: React.FC<NewPurchaseModalProps> = ({onClose, onSubmit, isOpen, investment}) => {
    // State
    const [quantity, setQuantity] = useState<number>(0);
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [price, setPrice] = useState<number>(0);

    // Services
    const polygonAPI = PolygonAPI.polygonClient;

    const updatePrice = ((date: string) => {
        polygonAPI.stocks
            .dailyOpenClose(investment.symbol, date)
            .then((data) => {
                if (data.close !== undefined) {
                    setPrice(data.close);
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    );

    // Handlers
    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(+event.target.value);
    }

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
        updatePrice(event.target.value);
    }

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(+event.target.value);
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const purchase: PortfolioPurchase = {
            key: nanoid() + date,
            quantity: quantity,
            date: date,
            price: price
        }

        onSubmit(purchase);
        onClose();
    }

    return (
        <>
            {isOpen &&
                <div className={styles.container}>
                    <div className={styles.overlay}></div>
                    <div className={styles.content}>
                        <div className={styles.header}>
                            <h3 className={styles.heading}>{`Record a purchase for "${investment.name}"`}</h3>
                        </div>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.inputs}>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label} htmlFor="purchaseQuantity">Quantity</label>
                                    <input className={styles.input}
                                            onChange={handleQuantityChange}
                                            value={quantity}
                                            type="number" min="0" step="any" name="purchaseQuantity" id="purchaseQuantity" />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label} htmlFor="purchaseDate">Purchase date</label>
                                    <input className={styles.input}
                                            onChange={handleDateChange}
                                            value={date}
                                            type="date" name="purchaseDate" id="purchaseDate"/>
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label} htmlFor="purchasePrice">Purchase price</label>
                                    <input className={styles.input}
                                            onChange={handlePriceChange}
                                            value={price}
                                            type="number" min="0" step="any" name="purchasePrice" id="purchasePrice"/>
                                </div>
                            </div>
                            <div className={styles.buttons}>
                                {/* eslint-disable-next-line react/style-prop-object */}
                                <Button name="Close" onClick={onClose} style="remove"/>
                                <Button name="Submit" type="submit" />
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    );
}

export default NewPurchaseModal;