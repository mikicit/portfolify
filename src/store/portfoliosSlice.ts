import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import {
    PortfoliosState,
    AddInvestmentPayload,
    RemoveInvestmentPayload,
    AddPurchasePayload,
    RemovePurchasePayload
} from '../model/portfolio';
import { UpdateInvestmentPayload } from '../model/investment';
import { RootState } from "./store";

const initialState: PortfoliosState = {
    lastUpdate: null,
    portfolios: []
}

const portfoliosSlice = createSlice({
    name: 'portfolios',
    initialState: initialState,
    reducers: {
        addList: (state, action: PayloadAction<string>) => {
            let name = action.payload.trim();

            if (name === "") {
                name = `New Portfolio ${state.portfolios.length + 1}`;
            } else {
                name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
            }

            const newPortfolio = {
                key: nanoid(),
                name: name,
                data: [],
            };

            state.portfolios.push(newPortfolio);
        },

        removeList: (state, action: PayloadAction<string>) => {
            state.portfolios = state.portfolios.filter(
                (portfolio: { key: string; }) => portfolio.key !== action.payload
            );
        },

        addInvestment: (state, action: PayloadAction<AddInvestmentPayload>) => {
            const { portfolioKey, investment } = action.payload;

            const portfolio = state.portfolios.find(
                (portfolio: { key: string; }) => portfolio.key === portfolioKey
            );

            if (portfolio) {
                if (portfolio.data.find((item: { key: string; }) => item.key === investment.key)) {
                    return;
                }

                portfolio.data.push(investment);
            }
        },

        updateInvestment: (state, action: PayloadAction<UpdateInvestmentPayload>) => {
            const { listKey, investmentKey } = action.payload;

            const portfolio = state.portfolios.find((portfolio: { key: string; }) => portfolio.key === listKey);

            if (portfolio) {
                const index = portfolio.data.findIndex((item: { key: string; }) => item.key === investmentKey);

                if (index !== -1) {
                    portfolio.data[index].price = action.payload.price;
                    portfolio.data[index].change = action.payload.change;
                    portfolio.data[index].changePercent = action.payload.changePercent;
                }
            }
        },

        removeInvestment: (state, action: PayloadAction<RemoveInvestmentPayload>) => {
            const { portfolioKey, investmentKey } = action.payload;

            const portfolio = state.portfolios.find(
                (portfolio: { key: string; }) => portfolio.key === portfolioKey
            );

            if (portfolio) {
                portfolio.data = portfolio.data.filter(
                    (item: { key: string; }) => item.key !== investmentKey
                );
            }
        },

        addPurchase: (state, action: PayloadAction<AddPurchasePayload>) => {
            const { portfolioKey, investmentKey, purchase } = action.payload;

            const portfolio = state.portfolios.find((portfolio: { key: string; }) => portfolio.key === portfolioKey);

            if (portfolio) {
                const investment = portfolio.data.find((item: { key: string; }) => item.key === investmentKey);

                if (investment) {
                    investment.purchases.push(purchase);
                }
            }
        },

        removePurchase: (state, action: PayloadAction<RemovePurchasePayload>) => {
            const { portfolioKey, investmentKey, purchaseKey } = action.payload;

            const portfolio = state.portfolios.find(
                (portfolio: { key: string; }) => portfolio.key === portfolioKey);


            if (portfolio) {
                const investment = portfolio.data.find((item: { key: string; }) => item.key === investmentKey);

                if (investment) {
                    investment.purchases = investment.purchases.filter(
                        (purchase: { key: string; }) => purchase.key !== purchaseKey);
                }
            }
        },

        updateLastUpdate: (state, action: PayloadAction<Date>) => {
            state.lastUpdate = action.payload;
        }
    },
});

export const selectLastList = (state: RootState) => {
    const portfolios = state.portfolios.portfolios;
    if (portfolios.length > 0) {
        return portfolios[portfolios.length - 1];
    }
    return null;
};

export const {
    addList,
    removeList,
    addInvestment,
    updateInvestment,
    removeInvestment,
    addPurchase,
    removePurchase,
    updateLastUpdate
} = portfoliosSlice.actions;

export default portfoliosSlice.reducer;