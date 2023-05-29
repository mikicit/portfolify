export interface Investment {
    key: string;
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
}

export interface UpdateInvestmentPayload {
    listKey: string;
    investmentKey: string;
    price: number;
    change: number;
    changePercent: number;
}