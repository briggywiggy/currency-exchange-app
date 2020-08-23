import toastr from 'toastr';
import { history } from '../routers/AppRouter';
import { localLoginService, localLogoutService } from '../services/auth.service';

export const localLogin = (token) => ({
    type: 'LOCAL_LOGIN',
    token
});

export const localLogout = () => ({
    type: 'LOCAL_LOGOUT'
});

export const startLocalLogin = (data) => {
    return (dispatch) => {
        return localLoginService(data)
        .then((response) => {
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
        const token = getState().localAuth.token;
        return localLogoutService(token)
        .then(() => {
            localStorage.removeItem("token");
            dispatch(localLogout());
            history.push('/');
        }).catch((error) => {
            toastr.error(error);
        })
    }
}