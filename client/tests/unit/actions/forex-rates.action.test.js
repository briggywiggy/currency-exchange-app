import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addForexRate } from '../../../src/actions/forex-rates.action';

const createMockStore = configureMockStore([thunk]);

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