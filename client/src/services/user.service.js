import axios from 'axios';

export const registerUserService = (data) => {
    return axios({
        method: 'post',
        url: '/api/users',
        data
    });
}

export const getUserService = (token) => {
    return axios({
        method: 'get',
        url: '/api/users/me',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}