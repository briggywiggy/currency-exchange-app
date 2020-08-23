import axios from 'axios';

export const forexGetCurrencies = () => {
    return axios.get(`/api/forex/symbols`);
}

export const forexConvert = (params) => {
    return axios.get(`/api/forex/convert`, params);
}

export const forexGetRates = (params) => {
    return axios.get(`/api/forex/rates`, params);
}