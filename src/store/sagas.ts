import { takeEvery, put, delay, select, call } from 'redux-saga/effects';
import { updateInvestment as updateWatchlistInvestment, updateLastUpdate as updateLastUpdateWatchlists } from './watchlistsSlice';
import { updateInvestment as updatePortfolioInvestment, updateLastUpdate as updateLastUpdatePortfolios} from './portfoliosSlice';

import PolygonAPI from "../services/PolygonAPI";

const polygonAPI = PolygonAPI.polygonClient;

function* updateWatchlistsSaga(): Generator<any, void, any> {
    while (true) {
        yield delay(60000);
        try {
            const state = yield select();

            if (state.watchlists.lastUpdate !== null && state.watchlists.lastUpdate > new Date(Date.now() - (60 * 60 * 1000))) {
                continue;
            }

            for (const watchlist of state.watchlists.watchlists) {
                for (const investment of watchlist.data) {
                    const r = yield call(polygonAPI.stocks.previousClose, investment.symbol);

                    if (
                        r.status === 'OK' &&
                        r.results !== undefined &&
                        r.results.length > 0 &&
                        r.results[0].c !== undefined &&
                        r.results[0].o !== undefined
                    ) {
                        const change = +(r.results[0].c - r.results[0].o).toFixed(2);
                        const changePercent = +((r.results[0].c - r.results[0].o) / r.results[0].o).toFixed(2);

                        const updatedInvestment = {
                            listKey: watchlist.key,
                            investmentKey: investment.key,
                            price: r.results[0].c,
                            change: change,
                            changePercent: changePercent,
                        };

                        yield put(updateWatchlistInvestment(updatedInvestment));
                        yield put(updateLastUpdateWatchlists(new Date()));
                    } else {
                        console.error(`Error fetching previous close for ${investment.symbol}`);
                    }
                }
            }
        } catch (error) {
            console.error('Error updating watchlists:', error);
        }
    }
}

function* updatePortfoliosSaga(): Generator<any, void, any> {
    while (true) {
        yield delay(60000);
        try {
            const state = yield select();

            if (state.portfolios.lastUpdate !== null && state.portfolios.lastUpdate > new Date(Date.now() - (60 * 60 * 1000))) {
                continue;
            }

            for (const portfolio of state.portfolios.portfolios) {
                for (const investment of portfolio.data) {
                    const r = yield call(polygonAPI.stocks.previousClose, investment.symbol);

                    if (
                        r.status === 'OK' &&
                        r.results !== undefined &&
                        r.results.length > 0 &&
                        r.results[0].c !== undefined &&
                        r.results[0].o !== undefined
                    ) {
                        const change = +(r.results[0].c - r.results[0].o).toFixed(2);
                        const changePercent = +((r.results[0].c - r.results[0].o) / r.results[0].o).toFixed(2);

                        const updatedInvestment = {
                            listKey: portfolio.key,
                            investmentKey: investment.key,
                            price: r.results[0].c,
                            change: change,
                            changePercent: changePercent,
                        };

                        yield put(updatePortfolioInvestment(updatedInvestment));
                        yield put(updateLastUpdatePortfolios(new Date()));
                    } else {
                        console.error(`Error fetching previous close for ${investment.symbol}`);
                    }
                }
            }
        } catch (error) {
            console.error('Error updating watchlists:', error);
        }
    }
}

export default function* rootSaga() {
    yield takeEvery('watchlists/startWatchlistsUpdates', updateWatchlistsSaga);
    yield takeEvery('portfolios/startPortfoliosUpdates', updatePortfoliosSaga);
}