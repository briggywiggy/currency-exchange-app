import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoadingPage from '../../routes/LoadingPage/loading-page.route';
import CurrencyConverter from '../../components/CurrencyConverter/currency-converter.component';
import ForexRatesTable from '../../components/ForexRatesTable/forex-rates-table.component';

import { startPopulateCurrencies } from '../../actions/currencies.action';

const DashboardPage = () => {
    const currencies = useSelector(state => state.currencies);
    const dispatch = useDispatch();

    useEffect(() => {
        if(Object.keys(currencies).length === 0) dispatch(startPopulateCurrencies());
    }, []);

    return (
        <>
            {
                Object.keys(currencies).length === 0 ?
                <LoadingPage /> :
                <div className="dashboard-page page">
                    <div className="content-container">
                        <CurrencyConverter />
                        <ForexRatesTable />
                    </div>
                </div>
            }
        </>
    )
}

export default DashboardPage;