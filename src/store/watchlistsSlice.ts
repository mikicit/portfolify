import {createSlice, nanoid, PayloadAction} from '@reduxjs/toolkit';
import {AddInvestmentPayload, RemoveInvestmentPayload, WatchlistsState} from '../model/watchlist';
import {RootState} from "./store";
import {UpdateInvestmentPayload} from "../model/investment";

const initialState: WatchlistsState = {
    lastUpdate: null,
    watchlists: []
}

const watchlistsSlice = createSlice({
    name: 'watchlists',
    initialState: initialState,
    reducers: {
        updateInvestment: (state, action: PayloadAction<UpdateInvestmentPayload>) => {
            const { listKey, investmentKey } = action.payload;

            const watchlist = state.watchlists.find((watchlist: { key: string; }) => watchlist.key === listKey);

            if (watchlist) {
                const index = watchlist.data.findIndex((item: { key: string; }) => item.key === investmentKey);

                if (index !== -1) {
                    watchlist.data[index].price = action.payload.price;
                    watchlist.data[index].change = action.payload.change;
                    watchlist.data[index].changePercent = action.payload.changePercent;
                }
            }
        },

        addList: (state, action: PayloadAction<string>) => {
            let name = action.payload.trim();

            if (name === "") {
                name = `New Watchlist ${state.watchlists.length + 1}`;
            } else {
                name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
            }

            const newWatchlist = {
                key: nanoid(),
                name: name,
                data: [],
            };

            state.watchlists.push(newWatchlist);
        },

        removeList: (state, action: PayloadAction<string>) => {
            state.watchlists = state.watchlists.filter(
                (watchlist: { key: string; }) => watchlist.key !== action.payload
            );
        },

        addItem: (state, action: PayloadAction<AddInvestmentPayload>) => {
            const { watchlistKey, investment } = action.payload;
            const watchlist = state.watchlists.find((watchlist: { key: string; }) => watchlist.key === watchlistKey);
            if (watchlist) {
                if (watchlist.data.find((item: { key: string; }) => item.key === investment.key)) {
                    return;
                }

                watchlist.data.push(investment);
            }
        },

        removeItem: (state, action: PayloadAction<RemoveInvestmentPayload>) => {
            const { watchlistKey, investmentKey } = action.payload;
            const watchlist = state.watchlists.find((watchlist: { key: string; }) => watchlist.key === watchlistKey);
            if (watchlist) {
                watchlist.data = watchlist.data.filter((item: { key: string; }) => item.key !== investmentKey);
            }
        },

        updateLastUpdate: (state, action: PayloadAction<Date>) => {
            state.lastUpdate = action.payload;
        }
    },
});

export const selectLastList = (state: RootState) => {
    const watchlists = state.watchlists.watchlists;
    if (watchlists.length > 0) {
        return watchlists[watchlists.length - 1];
    }
    return null;
};

export const {
    updateInvestment,
    addList,
    removeList,
    addItem,
    removeItem,
    updateLastUpdate
} = watchlistsSlice.actions;

export default watchlistsSlice.reducer;