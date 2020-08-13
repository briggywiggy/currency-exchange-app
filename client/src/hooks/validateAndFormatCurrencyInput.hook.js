import numeral from 'numeral';
import countDecimals from './countDecimals.hook';

const validateAndFormatCurrencyInput = (value, callback) => {
    let raw = value.toString().replace(/,/g, '');
    if(countDecimals(raw) > 10) {
        raw = parseFloat(raw).toFixed(10);
    }
    const lastChar = raw.slice(raw.length - 1);
    const integer = raw.split('.')[0];
    const decimal = raw.split('.')[1];
    let amount = numeral(integer).format('0,0');
    if(lastChar === '.') amount += '.';
    if(decimal) amount += `.${decimal}`;

    if(!amount || amount.match(/^\d{1,3}(,\d{3})*(\.\d{0,10})?$/)) {
        if(callback) {
            callback(amount);
        } else {
            return amount;
        }
    }
}

export { validateAndFormatCurrencyInput as default }