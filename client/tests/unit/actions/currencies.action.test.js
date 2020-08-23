import configureMockStore from 'redux-mock-store';
import { populateCurrencies } from '../../../src/actions/currencies.action';

test('should generate populateCurrencies action object', () => {
    const currencies = '123abc';
    const action = populateCurrencies(currencies);
    expect(action).toEqual({
        type: 'POPULATE_CURRENCIES',
        currencies
    });
});