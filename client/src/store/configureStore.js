import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import authReducer from '../reducers/auth.reducer';
import currenciesReducer from '../reducers/currencies.reducer';
import forexRatesReducer from '../reducers/forex-rates.reducer';
import conversionRateReducer from '../reducers/conversion-rate.reducer';
import localAuthReducer from '../reducers/local-auth.reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware()

export default () => {
    const middlewares = [thunk, sagaMiddleware];
    const store = createStore(
        combineReducers({
            auth: authReducer,
            currencies: currenciesReducer,
            forexRates: forexRatesReducer,
            conversionRate: conversionRateReducer,
            localAuth: localAuthReducer
        }),
        composeEnhancers(applyMiddleware(...middlewares))
    );

    return store;
}