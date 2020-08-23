import configureMockStore from 'redux-mock-store';
import { addForexRate } from '../../../src/actions/forex-rates.action';

test('should generate addForexRate action object', () => {
    const base = 'USD';
    const forexRate = '123abc';
    const action = addForexRate({ base, forexRate });
    expect(action).toEqual({
        type: 'ADD_FOREX_RATE',
        base,
        forexRate
    });
});