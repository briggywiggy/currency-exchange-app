import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import toastr from 'toastr';

import FormInput from '../../components/FormInput/form-input.component';
import Button from '../../components/Button/button.component';
import { history } from '../../routers/AppRouter';
import { startLogin } from '../../actions/auth.action';

const UserForm = ({ title, subtitle, subtext, action, hasGoogleLogin, submitDispatch }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (action !== 'register' || password === confirmPassword) {
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setName('');
            dispatch(submitDispatch(processPayload()));
        } else {
            toastr.error('Password does not match!');
        }
    }
    const processPayload = () => {
        switch (action) {
            case 'login':
                return { email, password }
            case 'register':
                return { email, password, name }
            default:
                return
        }
    }

    return (
        <div className="user-form">

            <div className="box-layout">
                <div className="box-layout__box">
                    {
                        !!title &&
                        <h1 className="box-layout__title">{title}</h1>
                    }

                    <h2 className="box-layout__subtitle">
                        {action === 'login' ? <i className="fas fa-lock"></i> : subtitle}
                    </h2>
                    <span className="box-layout__subtext">{subtext}</span>
                    <form onSubmit={handleOnSubmit}>
                        <FormInput type="email"
                            value={email}
                            handleChange={(e) => setEmail(e.target.value)}
                            label="Email"
                            required
                        />

                        <FormInput type="password"
                            value={password}
                            handleChange={(e) => setPassword(e.target.value)}
                            label="Password"
                            required
                        />

                        {
                            action !== 'login' &&
                            <>
                                <FormInput type="password"
                                    value={confirmPassword}
                                    handleChange={(e) => setConfirmPassword(e.target.value)}
                                    label="Confirm Password"
                                    required
                                />
                                <FormInput type="text"
                                    value={name}
                                    handleChange={(e) => setName(e.target.value)}
                                    label="Name"
                                    required
                                />
                            </>
                        }

                        <Button type="submit" isFullWidth>{action}</Button>
                        {
                            hasGoogleLogin &&
                            <>
                                <p>or</p>
                                <div className="google-signin-button" onClick={() => dispatch(startLogin())}></div>
                            </>
                        }
                    </form>

                    {
                        action === 'login' &&
                        <p className="user-form__register-text">
                            Don&apos;t have an account?&nbsp;
                            <span className="user-form__register-link" onClick={() => history.push('/register')}>Register</span>
                        </p>
                    }

                    {
                        action === 'register' &&
                        <p className="user-form__register-text">
                            Already have an account?&nbsp;
                            <span className="user-form__register-link" onClick={() => history.push('/')}>Login</span>
                        </p>
                    }
                </div>
            </div>
        </div>
    )
}

export { UserForm as default }