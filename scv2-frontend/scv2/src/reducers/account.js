export default (state = {}, action) => {
    switch (action.type) {
        case 'EDIT_ACCOUNT':
            return {
                ...state,
                account: action.account,
            }
        default:
            return state
    }
}