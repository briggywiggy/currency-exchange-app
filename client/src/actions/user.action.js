import axios from 'axios';
import toastr from 'toastr';
import { localLogin } from './local-auth.action';
import { history } from '../routers/AppRouter';

export const startRegisterUser = (data) => {
    return (dispatch, getState) => {
        return axios({
            method: 'post',
            url: '/api/users',
            data
        }).then((response) => {
            const token = response.data.token;
            localStorage.setItem("token", token);
            dispatch(localLogin(token));
            history.push('/dashboard');
        }).catch((error) => {
            toastr.error("A problem was encountered in registering this user.");
        })
    }
}