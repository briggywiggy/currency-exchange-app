import localAuthReducer from '../../../src/reducers/local-auth.reducer'

test('should set default state', () => {
    const state = localAuthReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({});
});

test('should set token state', () => {
    const token = '123abc'
    const action = {
        type: 'LOCAL_LOGIN',
        token
    };
    const state = localAuthReducer(undefined, action);
    expect(state.token).toEqual(token);
})

test('should remove token state', () => {
    const action = {
        type: 'LOCAL_LOGOUT'
    }
    const state = localAuthReducer(undefined, action);
    expect(state).toEqual({});
})