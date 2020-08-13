import conversionRateReducer from '../../../src/reducers/conversion-rate.reducer'

test('should set default state', () => {
    const state = conversionRateReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({});
});

test('should set conversion rate', () => {
    const conversionRate = '123abc';
    const action = {
        type: 'SET_CONVERSION_RATE',
        conversionRate
    };
    const state = conversionRateReducer(undefined, action);
    expect(state).toEqual(conversionRate);
});