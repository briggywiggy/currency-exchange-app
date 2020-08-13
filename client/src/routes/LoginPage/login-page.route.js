import React from 'react'
import UserForm from '../../components/UserForm/user-form.component';
import { startLocalLogin } from '../../actions/local-auth.action';

export const LoginPage = () => {
    return (
        <div className="login-page page">
            <div className="content-container">
                <UserForm
                title={'3DK Exam'}
                subtitle={'Login Required'}
                subtext={'Enter your e-mail and password to continue'}
                action={'login'}
                hasGoogleLogin
                submitDispatch={startLocalLogin}
                />
            </div>
        </div>
    )
}

export default LoginPage;