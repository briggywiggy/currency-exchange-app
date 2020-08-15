import axios from 'axios';
import toastr from 'toastr';
import { history } from '../routers/AppRouter';

export const localLogin = (token) => ({
    type: 'LOCAL_LOGIN',
    token
});

export const localLogout = () => ({
    type: 'LOCAL_LOGOUT'
});

export const startLocalLogin = (data) => {
    return (dispatch) => {
        return axios({
            method: 'post',
            url: '/api/users/login',
            data
        }).then((response) => {
            const token = response.data.token;
            localStorage.setItem("token", token);
            dispatch(localLogin(token));
            history.push('/dashboard');
        }).catch(() => {
            toastr.error('Invalid username or password.');
        })
    }
}

export const startLocalLogout = () => {
    return (dispatch, getState) => {
        return axios({
            method: 'post',
            url: '/api/users/logout',
            headers: {
                "Authorization": `Bearer ${getState().localAuth.token}`
            }
        }).then(() => {
            localStorage.removeItem("token");
            dispatch(localLogout());
            history.push('/');
        }).catch((error) => {
            toastr.error(error);
        })
    }
}