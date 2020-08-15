const forexRatesReducerDefaultState = {}

const forexRatesReducer = (state = forexRatesReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_FOREX_RATE': {
            let obj = new Object();
            obj[action.base] = action.forexRate
            return {
                ...state,
                ...obj
            }
        }
        default:
            return state;
    }
}

export { forexRatesReducer as default }