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