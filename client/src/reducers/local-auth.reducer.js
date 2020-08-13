export default (state = {}, action) => {
    switch(action.type) {
        case 'LOCAL_LOGIN':
            return {
                token: action.token
            };
        case 'LOCAL_LOGOUT':
            return {};
        default:
            return state;
    }
}