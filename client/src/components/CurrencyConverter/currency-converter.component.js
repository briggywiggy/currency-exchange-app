import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import numeral from 'numeral';

import FormInput from '../FormInput/form-input.component';
import Button from '../Button/button.component';
import CurrencyPicker from '../CurrencyPicker/currency-picker.component';
import LoadingPage from '../../routes/LoadingPage/loading-page.route';

import { startSetConversionRate } from '../../actions/conversion-rate.action';
import formatTimeStampToUTC from '../../hooks/formatTimeStampToUTC.hook';
import validateAndFormatCurrencyInput from '../../hooks/validateAndFormatCurrencyInput.hook';

const CurrencyConverter = () => {
    const currencies = useSelector(state => state.currencies);
    const conversionRate = useSelector(state => state.conversionRate);
    const dispatch = useDispatch();
    
    const [firstAmount, setFirstAmount] = useState(1);
    const [firstCurrency, setFirstCurrency] = useState("USD");
    const [secondAmount, setSecondAmount] = useState("");
    const [secondCurrency, setSecondCurrency] = useState("EUR");

    const dispatchStartSetConversionRate = () => {
        const data = {
            base: firstCurrency,
            symbols: secondCurrency
        }
        dispatch(startSetConversionRate(data));
    }

    const convertAmount = () => {
        if(Object.keys(conversionRate).length > 0 && !conversionRate.hasOwnProperty('error')) {
            const amount = numeral(firstAmount).value() * conversionRate.rate;
            validateAndFormatCurrencyInput(amount, setSecondAmount);
        }
    }

    const handleOnClick = () => {
        const retainFirstCurrency = firstCurrency;
        setFirstCurrency(secondCurrency);
        setSecondCurrency(retainFirstCurrency);
    }

    useEffect(() => {
        convertAmount();
    }, [conversionRate, firstAmount]);

    useEffect(() => {
        dispatchStartSetConversionRate();
    }, [firstCurrency, secondCurrency]);

    return (
            <div className="currency-converter">
                <div className="currency-converter__container">
                    <div className="currency-converter__group">
                        <FormInput type="text"
                            label="Amount"
                            value={firstAmount}
                            isForexInput
                            handleChange={(e) => validateAndFormatCurrencyInput(e.target.value, setFirstAmount)}
                        />

                        <CurrencyPicker value={firstCurrency}
                            handleChange={(e) => setFirstCurrency(e.target.value)} />
                    </div>

                    <Button onClick={handleOnClick}>
                        <i className="fas fa-arrows-alt-h"></i>
                    </Button>

                    <div className="currency-converter__group">
                        <FormInput type="text"
                            label="Converted to"
                            value={secondAmount}
                            isForexInput
                            readOnly
                        />
                        <CurrencyPicker value={secondCurrency}
                        handleChange={(e) => setSecondCurrency(e.target.value)} />
                    </div>
                </div>
                
                {
                    Object.keys(conversionRate).length > 0 &&
                    <div className="currency-converter__display">
                        { 
                            conversionRate.hasOwnProperty('error') ?
                            <h4>A problem was encountered. Please try again.</h4> :
                            <>
                                <h4>{`1 ${currencies[firstCurrency]}`} equals <br className="show-for-mobile"/><strong><span className="success">{validateAndFormatCurrencyInput(conversionRate.rate)}</span> {`${currencies[secondCurrency]}`}</strong></h4>
                                <small>Exchange rate on <br className="show-for-mobile"/><strong>{formatTimeStampToUTC(conversionRate.timestamp)}</strong></small>
                            </>
                        }
                    </div>
                }
            </div>
    )
}

export default CurrencyConverter;