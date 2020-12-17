import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    error: null,
    token: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_INIT:
            return {
                ...state,
                loading: true
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.token
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null
            }
        default: return state;
    }
}

export default reducer;