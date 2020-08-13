import axios from 'axios';
import toastr from 'toastr';

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
    return (dispatch, getState) => {
        return axios.get(`/api/forex/rates`, params)
        .then((response) => {
            const forexRate = response.data;
            dispatch(addForexRate({ base, forexRate }));
        }).catch((error) => {
            dispatch(addForexRate({ base, forexRate: { error: true }}));
        })
    }
}