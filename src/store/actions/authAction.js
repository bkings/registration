import * as actionTypes from './actionTypes';
import axios from '../../axios-config';

export const authInit = () => {
    return {
        type: actionTypes.AUTH_INIT
    }
}

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authLogout = () => {
    localStorage.removeItem('reg-system-token');
    localStorage.removeItem('expiresIn');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime * 1000);
    }
}

export const authenticate = (email, password) => {
    return dispatch => {
        dispatch(authInit());
        const requestBody = {
            userName: email,
            password: password
        }
        axios
            .post('/authenticate', requestBody)
            .then(res => {
                const expirationIn = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('reg-system-token', res.data.token);
                localStorage.setItem('expiresIn', expirationIn);
                dispatch(authSuccess(res.data.token));
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });
    }
}

export const authCheckBeforeLogin = () => {
    return dispatch => {
        const token = localStorage.getItem('reg-system-token');
        if (!token) {
            dispatch(authLogout());
        } else {
            const expirationIn = new Date(localStorage.getItem('expiresIn'));
            if (expirationIn < new Date()) {
                dispatch(authLogout());
            } else {
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout((expirationIn.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}