import configureMockStore from 'redux-mock-store';
import { setConversionRate } from '../../../src/actions/conversion-rate.action';

test('should generate setConversionRate action object', () => {
    const conversionRate = '123abc';
    const action = setConversionRate(conversionRate);
    expect(action).toEqual({
        type: 'SET_CONVERSION_RATE',
        conversionRate
    });
});