const conversionRateReducerDefaultState = {}

const conversionRateReducer = (state = conversionRateReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_CONVERSION_RATE':
            return action.conversionRate;
        default:
            return state;
    }
}

export { conversionRateReducer as default }