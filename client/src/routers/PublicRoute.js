import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = (props) => {
    const isAuthenticatedGoogle = useSelector(state => !!state.auth.uid);
    const isAuthenticatedLocal = useSelector(state => !!state.localAuth.token);
    const isAuthenticated = isAuthenticatedGoogle || isAuthenticatedLocal;
    const { component: Component,
        ...rest
    } = props;
    return <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <Redirect to="/dashboard" />
        ) : (
            <div>
                <Component {...props} />
            </div>
        )
    )} />
};

export { PublicRoute as default }