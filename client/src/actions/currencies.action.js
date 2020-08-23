import toastr from 'toastr';
import { forexGetCurrencies } from '../services/forex.service';

export const populateCurrencies = (currencies) => ({
    type: 'POPULATE_CURRENCIES',
    currencies
});

export const startPopulateCurrencies = () => {
    return (dispatch) => {
        return forexGetCurrencies()
        .then((response) => {
            const currencies = response.data.symbols;
            dispatch(populateCurrencies(currencies))
        }).catch((error) => {
            toastr.error(error)
        })
    }
}