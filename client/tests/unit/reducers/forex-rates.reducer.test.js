import forexRatesReducer from '../../../src/reducers/forex-rates.reducer'

test('should set default state', () => {
    const state = forexRatesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({});
});

test('should add base as state property with forex rate as value', () => {
    const base = 'USD';
    const forexRate = '123abc'
    const action = {
        type: 'ADD_FOREX_RATE',
        base,
        forexRate
    };
    const state = forexRatesReducer(undefined, action);
    expect(state[base]).toEqual(forexRate);
});