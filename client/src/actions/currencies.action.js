import axios from 'axios';
import toastr from 'toastr';

export const populateCurrencies = (currencies) => ({
    type: 'POPULATE_CURRENCIES',
    currencies
});

export const startPopulateCurrencies = () => {
    return (dispatch, getState) => {
        return axios.get(`/api/forex/symbols`)
        .then((response) => {
            const currencies = response.data.symbols;
            dispatch(populateCurrencies(currencies))
        }).catch((error) => {
            toastr.error(error)
        })
    }
}