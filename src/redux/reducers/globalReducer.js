import ActionType from './globalActionType'

const globalState = {
    totalOrder: 0
}

const rootReducer = (state = globalState, action) => {
    switch (action.type) {
        case ActionType.ADD_ORDER:
            return {
                ...state,
                totalOrder: action.newValue 
            }
        default:
            return state;
    }
    // return state;
}

export default rootReducer;