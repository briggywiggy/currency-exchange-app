import currenciesReducer from '../../../src/reducers/currencies.reducer'

test('should set default state', () => {
    const state = currenciesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({});
});

test('should set currencies state', () => {
    const currencies = '123abc';
    const action = {
        type: 'POPULATE_CURRENCIES',
        currencies
    };
    const state = currenciesReducer(undefined, action);
    expect(state).toEqual(currencies);
});