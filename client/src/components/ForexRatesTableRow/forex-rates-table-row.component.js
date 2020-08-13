import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startAddForexRate } from '../../actions/forex-rates.action';
import Loader from '../../components/Loader/loader.component';

const ForexRatesTableRow = ({ index, currencyCode }) => {
    const currencies = useSelector(state => state.currencies);
    const forexRates = useSelector(state => state.forexRates);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startAddForexRate(currencyCode))
    }, [])

    return (
        <div key={index} className="tr">
            <div className="td">
                <div className={`currency-flag currency-flag-${currencyCode.toLowerCase()}`}></div>
                {currencyCode}
            </div>
            {
                !!forexRates[currencyCode] ?
                Object.keys(forexRates[currencyCode].rates)
                .sort()
                .map((ratescurrencyCode, ratesIndex) => (
                    <div key={ratesIndex} className="td">
                    {forexRates[currencyCode].rates[ratescurrencyCode]}
                    </div>
                )) :
                Object.keys(currencies).map((keyName, currenciesIndex) => (
                    <div key={currenciesIndex} className="td">
                        <Loader />
                    </div>
                ))
            }
        </div>
    )
}

export { ForexRatesTableRow as default }