import {Investment} from "./investment";

export interface Portfolio {
    key: string;
    name: string;
    data: PortfolioInvestment[];
}

export interface PortfolioInvestment extends Investment {
    key: string;
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    purchases : PortfolioPurchase[];
}

export interface PortfolioPurchase {
    key: string;
    date: string;
    price: number;
    quantity: number;
}

export interface PortfoliosState {
    lastUpdate: Date | null;
    portfolios: Portfolio[];
}

export interface AddInvestmentPayload {
    portfolioKey: string;
    investment: PortfolioInvestment;
}

export interface RemoveInvestmentPayload {
    portfolioKey: string;
    investmentKey: string;
}

export interface AddPurchasePayload {
    portfolioKey: string;
    investmentKey: string;
    purchase: PortfolioPurchase;
}

export interface RemovePurchasePayload {
    portfolioKey: string;
    investmentKey: string;
    purchaseKey: string;
}
