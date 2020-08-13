const currenciesReducerDefaultState = {}

const currenciesReducer = (state = currenciesReducerDefaultState, action) => {
    switch(action.type) {
        case 'POPULATE_CURRENCIES':
            return action.currencies;

        default:
            return state;
    }
}

export { currenciesReducer as default }