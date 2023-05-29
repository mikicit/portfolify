import {Investment} from "./investment";

export interface Watchlist {
    key: string;
    name: string;
    data: WatchlistInvestment[];
}

export interface WatchlistInvestment extends Investment {
    key: string;
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
}

export interface WatchlistsState {
    lastUpdate: Date | null;
    watchlists: Watchlist[];
}

export interface AddInvestmentPayload {
    watchlistKey: string;
    investment: WatchlistInvestment;
}

export interface RemoveInvestmentPayload {
    watchlistKey: string;
    investmentKey: string;
}