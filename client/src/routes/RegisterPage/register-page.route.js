import React from 'react'
import UserForm from '../../components/UserForm/user-form.component';
import { startRegisterUser } from '../../actions/user.action';

export const RegisterPage = () => (
    <div className="register-page page">
            <div className="content-container">
                <UserForm
                subtitle={'Registration'}
                subtext={'Create a new account'}
                action={'register'}
                submitDispatch={startRegisterUser}
                />
            </div>
        </div>
)

export default RegisterPage;