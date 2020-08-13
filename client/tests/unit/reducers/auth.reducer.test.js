import authReducer from '../../../src/reducers/auth.reducer'

test('should set default state', () => {
    const state = authReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({});
});

test('should login, set uid', () => {
    const uid = '123abc'
    const action = {
        type: 'LOGIN',
        uid
    };
    const state = authReducer(undefined, action);
    expect(state.uid).toEqual(uid);
});

test('should logout, remove uid', () => {
    const action = {
        type: 'LOGOUT'
    }
    const state=  authReducer({ uid: '123abc' }, action);
    expect(state).toEqual({});
})