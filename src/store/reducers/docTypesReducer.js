import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    error: null,
    documentTypes: [],
    registeredDocuments: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_DOCTYPE_INIT:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_DOCTYPE_SUCCESS:
            return {
                ...state,
                loading: false,
                documentTypes: action.documentTypes
            }
        case actionTypes.FETCH_DOCTYPE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.FETCH_REGDATA_INIT:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_REGDATA_SUCCESS:
            return {
                ...state,
                loading: false,
                registeredDocuments: action.regData
            }
        case actionTypes.FETCH_REGDATA_FAIL:
            return {
                ...state,
                loading: false,
                error: action.err
            }
        case actionTypes.REGISTER_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case actionTypes.REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
}

export default reducer;