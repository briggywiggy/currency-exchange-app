import axios from 'axios';

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
        return axios.get(`/api/forex/rates`, params)
        .then((response) => {
            const forexRate = response.data;
            dispatch(addForexRate({ base, forexRate }));
        }).catch(() => {
            dispatch(addForexRate({ base, forexRate: { error: true }}));
        })
    }
}