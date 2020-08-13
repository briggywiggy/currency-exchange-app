import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth.action';
import { firebase } from './firebase/firebase';
import LoadingPage from './routes/LoadingPage/loading-page.route';
import { localLogin } from './actions/local-auth.action';

import 'normalize.css/normalize.css';
import 'currency-flags/dist/currency-flags.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles/styles.scss';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);
let hasRendered = false;
const renderApp = () => {
    if(!hasRendered) {
        ReactDOM.render(jsx, document.getElementById("app"));
        hasRendered = true;
    }
};
ReactDOM.render(<LoadingPage />, document.getElementById("app"));

const token = localStorage.getItem("token");

let verifyIfTokenIsValid = async () => {
    await axios({
        method: 'get',
        url: '/api/users/me',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then((response) => {
        store.dispatch(localLogin(token));
        history.push('/dashboard');
    }).catch((error) => {
        localStorage.removeItem("token");
    })
}
if(!!token) {
    verifyIfTokenIsValid();
}

firebase.auth().onAuthStateChanged((user) => {
    if(user) {
        store.dispatch(login(user.uid));
        renderApp();
        if(history.location.pathname === '/') {
            history.push('/dashboard');
        }
    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});