import configureMockStore from 'redux-mock-store';
import { localLogin, localLogout } from '../../../src/actions/local-auth.action';

test('should generate localLogin action object', () => {
    const token = '123abc';
    const action = localLogin(token);
    expect(action).toEqual({
        type: 'LOCAL_LOGIN',
        token
    });
});

test('should generate localLogout action object', () => {
    const action = localLogout();
    expect(action).toEqual({
        type: 'LOCAL_LOGOUT'
    });
});