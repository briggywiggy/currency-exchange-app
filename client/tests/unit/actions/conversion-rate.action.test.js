import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { setConversionRate } from '../../../src/actions/conversion-rate.action';

const createMockStore = configureMockStore([thunk]);

test('should generate setConversionRate action object', () => {
    const conversionRate = '123abc';
    const action = setConversionRate(conversionRate);
    expect(action).toEqual({
        type: 'SET_CONVERSION_RATE',
        conversionRate
    });
});