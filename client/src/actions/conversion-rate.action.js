import toastr from 'toastr';
import { forexConvert } from '../services/forex.service';

export const setConversionRate = (conversionRate) => ({
    type: 'SET_CONVERSION_RATE',
    conversionRate
});

export const startSetConversionRate = ({base, symbols}) => {
    const params = {
        params: {
            base,
            symbols
        }
    }
    return (dispatch) => {
        return forexConvert(params)
        .then((response) => {
            const { date, timestamp } = response.data;
            const conversionRate = {
                date,
                from: base,
                rate: response.data.rates[symbols],
                revertRate: 1 / response.data.rates[symbols],
                timestamp,
                to: symbols
            };
            dispatch(setConversionRate(conversionRate));
        }).catch((error) => {
            toastr.error(error);
            dispatch(setConversionRate({ error: true }));
        })
    }
}