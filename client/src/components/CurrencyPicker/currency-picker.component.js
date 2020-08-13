import React from 'react';
import { useSelector } from 'react-redux';

const CurrencyPicker = (({ handleChange, ...otherProps }) => {
    const currencies = useSelector(state => state.currencies);
    return (
        <div>
            <select className="currency-picker"
            onChange={handleChange}
            {...otherProps}>
                {Object.keys(currencies).map((keyName, index) => (
                    <option key={index}
                    value={keyName}>
                    {keyName}
                    </option>
                ))}
            </select>
        </div>
    )
})

export { CurrencyPicker as default }