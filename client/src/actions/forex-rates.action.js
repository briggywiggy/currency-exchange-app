import { forexGetRates } from '../services/forex.service';

export const addForexRate = ({ base, forexRate}) => ({
    type: 'ADD_FOREX_RATE',
    base,
    forexRate
});

export const startAddForexRate = (base) => {
    const params = {
        params: {
            base
        }
    }
    return (dispatch) => {
        return forexGetRates(params)
        .then((response) => {
            const forexRate = response.data;
            dispatch(addForexRate({ base, forexRate }));
        }).catch(() => {
            dispatch(addForexRate({ base, forexRate: { error: true }}));
        })
    }
}