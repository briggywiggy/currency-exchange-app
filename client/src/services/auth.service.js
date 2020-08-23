import axios from 'axios';

export const localLoginService = (data) => {
    return axios({
        method: 'post',
        url: '/api/users/login',
        data
    });
}

export const localLogoutService = (token) => {
    return axios({
        method: 'post',
        url: '/api/users/logout',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}