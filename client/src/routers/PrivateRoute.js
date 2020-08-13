import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header/header.component';

export const PrivateRoute = (props) => {
    const isAuthenticatedGoogle = useSelector(state => !!state.auth.uid);
    const isAuthenticatedLocal = useSelector(state => !!state.localAuth.token);
    const isAuthenticated = isAuthenticatedGoogle || isAuthenticatedLocal;
    const { component: Component,
        ...rest
    } = props;
    return <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <div>
                <Header />
                <Component {...props} />
            </div>
        ) : (
            <Redirect to="/" />
        )
    )} />
};

export { PrivateRoute as default }