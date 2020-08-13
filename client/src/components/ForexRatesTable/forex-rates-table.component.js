import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import ForexRatesTableRow from '../ForexRatesTableRow/forex-rates-table-row.component';

const ForexRatesTable = () => {
    const currencies = useSelector(state => state.currencies);
    const displayNumber = 8;
    const [rowCount, setRowCount] = useState(displayNumber);

    const handleScroll = (e) => {
        const maxCount = Object.keys(currencies).length;
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if(bottom && (rowCount < maxCount)) {
            setRowCount(rowCount + displayNumber);
        }
    }

    return (
        <div className="forex-rates-table">
            <div className="tbody" onScroll={handleScroll}>

                <div className="tr">
                    <div className="th td">&nbsp;</div>
                    {Object.keys(currencies).map((keyName, index) => (
                        <div key={index} className="th td">
                            <div className={`currency-flag currency-flag-${keyName.toLowerCase()}`}></div>
                            {keyName}
                        </div>
                    ))}
                </div>

                {Object.keys(currencies).map((keyName, index) => {
                    return index + 1 <= rowCount &&
                    <ForexRatesTableRow key={index}
                    currencyCode={keyName} />
                })}
            </div>
        </div>
    )
}

export { ForexRatesTable as default }