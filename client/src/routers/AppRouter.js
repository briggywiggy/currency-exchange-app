import React from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import NotFoundPage from '../routes/NotFoundPage/not-found-page.route';
import DashboardPage from '../routes/DashboardPage/dashboard-page.route';
import LoginPage from '../routes/LoginPage/login-page.route';
import RegisterPage from '../routes/RegisterPage/register-page.route';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true} />
                <PublicRoute path="/register" component={RegisterPage} exact={true} />
                <PrivateRoute path="/dashboard" component={DashboardPage} />
                <Route component={NotFoundPage}></Route>
            </Switch>
        </div>
    </Router>
)

export default AppRouter;