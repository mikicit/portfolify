// import { configureStore } from '@reduxjs/toolkit';
// import watchlistsReducer from './watchlistsSlice';
// import portfoliosReducer from './portfoliosSlice';
// import { loadState, saveState } from './localStorage';
//
// const persistedState = loadState();
//
// const store = configureStore({
//     reducer: {
//         watchlists: watchlistsReducer,
//         portfolios: portfoliosReducer,
//     },
//     preloadedState: persistedState,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: false,
//         }).concat((store) => (next) => (action) => {
//             const result = next(action);
//             saveState(store.getState());
//             return result;
//         }),
// });
//
// export default store;
//
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import watchlistsReducer from './watchlistsSlice';
import portfoliosReducer from './portfoliosSlice';
import { loadState, saveState } from './localStorage';
import rootSaga from './sagas';

const persistedState = loadState();
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        watchlists: watchlistsReducer,
        portfolios: portfoliosReducer,
    },
    preloadedState: persistedState,
    middleware: [...getDefaultMiddleware({ thunk: false, serializableCheck: false }), sagaMiddleware]
});

store.subscribe(() => {
    saveState(store.getState());
});

sagaMiddleware.run(rootSaga);

store.dispatch({ type: 'watchlists/startWatchlistsUpdates' });
store.dispatch({ type: 'portfolios/startPortfoliosUpdates' });

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;