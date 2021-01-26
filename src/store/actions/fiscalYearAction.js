import * as actionTypes from './actionTypes';
import axios from '../../axios-config';

export const fetchInit = () => {
    return {
        type: actionTypes.FETCH_FY_INIT
    }
}

export const fetchSuccess = fy => {
    return {
        type: actionTypes.FETCH_FY_SUCCESS,
        fiscalYear: fy
    }
}

export const fetchFail = err => {
    return {
        type: actionTypes.FETCH_FY_FAIL,
        error: err
    }
}

export const saveFyInit = () => {
    return {
        type: actionTypes.SAVE_FY_INIT
    }
}

export const saveFySuccess = fyData => {
    return {
        type: actionTypes.SAVE_DOCTYPE_SUCCESS,
        fyData
    }
}

export const saveFyFail = err => {
    return {
        type: actionTypes.SAVE_FY_FAIL,
        err
    }
}

export const fetchFy = token => {
    return dispatch => {
        dispatch(fetchInit());
        axios.defaults.headers.common['x-token'] = token;
        axios
            .get('/fiscalYear')
            .then(res => {
                dispatch(fetchSuccess(res.data));
            })
            .catch(error => {
                dispatch(fetchFail(error.response.data.error));
            })
    }
}

export const postFY = (token, data) => {
    return dispatch => {
        dispatch(saveFyInit());
        axios.defaults.headers.common['x-token'] = token;
        axios
            .post('/fiscalYear')
            .then(res => {
                dispatch(saveFySuccess(data));
            })
            .catch(err => {
                dispatch(saveFyFail(err.response.data.error));
            })
    }
}