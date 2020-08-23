import toastr from 'toastr';
import { localLogin } from './local-auth.action';
import { history } from '../routers/AppRouter';
import { registerUserService } from '../services/user.service';

export const startRegisterUser = (data) => {
    return (dispatch) => {
        return registerUserService(data)
        .then((response) => {
            const token = response.data.token;
            localStorage.setItem("token", token);
            dispatch(localLogin(token));
            history.push('/dashboard');
        }).catch(() => {
            toastr.error("A problem was encountered in registering this user.");
        })
    }
}