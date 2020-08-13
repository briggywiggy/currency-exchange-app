import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { populateCurrencies } from '../../../src/actions/currencies.action';

const createMockStore = configureMockStore([thunk]);

test('should generate populateCurrencies action object', () => {
    const currencies = '123abc';
    const action = populateCurrencies(currencies);
    expect(action).toEqual({
        type: 'POPULATE_CURRENCIES',
        currencies
    });
});