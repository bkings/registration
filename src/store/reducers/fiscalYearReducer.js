import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    error: null,
    fiscalYear: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_FY_INIT:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_FY_SUCCESS:
            return {
                ...state,
                loading: false,
                fiscalYear: action.fiscalYear
            }
        case actionTypes.FETCH_FY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.SAVE_FY_INIT:
            return {
                ...state,
                loading: true
            }
        case actionTypes.SAVE_FY_SUCCESS:
            return {
                ...state,
                loading: false,
                fiscalYear: state.fiscalYear.concat(action.fyData)
            }
        case actionTypes.SAVE_FY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.err
            }
        default:
            return state;
    }
}

export default reducer;