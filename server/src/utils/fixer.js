const request = require('request')

const key= process.env.FIXER_API_KEY
const SYMBOLS_TEST_DATA = require('../../tests/unit/fixtures/symbols.data.json');
const FOREX_RATES_TEST_DATA = require('../../tests/unit/fixtures/forex-rates.data.json');

const fixer = ({ type, base, symbols, test }, callback) => {
    let url = `http://data.fixer.io/api/${type}?access_key=${key}`;
    if (base) url+= `&base=${base}`;
    if (symbols) url+= `&symbols=${symbols}`;

    if(test) {
        // Accesses JSON file instead of third-party API
        // Added due to limited request in free tier
        switch(type) {
            case 'symbols':
                callback(undefined, SYMBOLS_TEST_DATA);
                break;
            case 'latest':
                let obj = FOREX_RATES_TEST_DATA;
                obj.base = base;
                let json = JSON.stringify(obj);
                callback(undefined, json);
                break;
            default:
                break;

        }
    } else {
        request({ url, json: true}, (error, { body }) => {
            if(error) {
                callback('Unable to connect to forex services.', undefined)
            } else if(body.error) {
                callback('Unable to process request. Try another query', undefined)
            } else {
                callback(undefined, body);
            }
        })
    }
}

module.exports = fixer