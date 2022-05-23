import {AUTH} from '../constants/actionTypes';
import * as api from '../api/index';

export const signin = (formData,navigateHistory) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch({type:AUTH, payload:data});
        navigateHistory.push('/');
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData,navigateHistory) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({type:AUTH, payload:data});
        navigateHistory.push('/');
    } catch (error) {
        console.log(error);
    }
}


