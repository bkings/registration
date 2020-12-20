import * as actionTypes from './actionTypes';
import axios from '../../axios-config';

export const fetchInit = () => {
    return {
        type: actionTypes.FETCH_DOCTYPE_INIT
    }
}

export const fetchSuccess = docTypes => {
    return {
        type: actionTypes.FETCH_DOCTYPE_SUCCESS,
        documentTypes: docTypes
    }
}

export const fetchFail = err => {
    return {
        type: actionTypes.FETCH_DOCTYPE_FAIL,
        error: err
    }
}

export const regDataFetchInit = () => {
    return {
        type: actionTypes.FETCH_REGDATA_INIT
    }
}

export const regDataFetchSuccess = regData => {
    return {
        type: actionTypes.FETCH_REGDATA_SUCCESS,
        regData
    }
}

export const regDataFetchFail = error => {
    return {
        type: actionTypes.FETCH_REGDATA_FAIL,
        err: error
    }
}

const registerStart = () => {
    return {
        type: actionTypes.REGISTER_START
    }
}

const registerSuccess = () => {
    return {
        type: actionTypes.REGISTER_SUCCESS
    }
}

const registerFail = error => {
    return {
        type: actionTypes.REGISTER_FAIL,
        error
    }
}

const saveDocTypeInit = () => {
    return {
        type: actionTypes.SAVE_DOCTYPE_INIT
    }
}

const saveDocTypeSuccess = () => {
    return {
        type: actionTypes.SAVE_DOCTYPE_SUCCESS
    }
}

const saveDocTypeFail = error => {
    return {
        type: actionTypes.SAVE_DOCTYPE_FAIL,
        error
    }
}

export const fetchData = token => {
    return dispatch => {
        axios.defaults.headers.common['x-token'] = token;
        dispatch(fetchInit());
        axios
            .get('/documentType')
            .then(res => {
                dispatch(fetchSuccess(res.data.documentTypes));
            })
            .catch(err => {
                dispatch(fetchFail(err.response.data.error));
            });
    }
}

export const fetchRegData = token => {
    return dispatch => {
        axios.defaults.headers.common['x-token'] = token;
        dispatch(regDataFetchInit());
        axios
            .get('/registerDocument')
            .then(res => {
                dispatch(regDataFetchSuccess(res.data.data));
            })
            .catch(err => {
                dispatch(err.response.data.error);
            })
    }
}

export const registerPost = (token, regData) => {
    return dispatch => {
        axios.defaults.headers.common['x-token'] = token;
        dispatch(registerStart());
        axios
            .post('/registerDocument', regData)
            .then(res => {
                dispatch(registerSuccess());
                dispatch(fetchRegData(token));
            })
            .catch(err => {
                dispatch(registerFail(err.response.data.error));
            })
    }
}

export const docTypePost = (token, docTypeData) => {
    return dispatch => {
        axios.defaults.headers.common['x-token'] = token;
        dispatch(saveDocTypeInit());
        axios
            .post('/documentType', docTypeData)
            .then(res => {
                dispatch(saveDocTypeSuccess());
                dispatch(fetchData(token));
            })
            .catch(err => {
                dispatch(saveDocTypeFail(err.response.data.error));
            })
    }
}