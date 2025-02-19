import * as AuthApi from '../api/AuthRequest.js';

export const logIn = (formData) => async (dispatch) => {

    dispatch({ type: 'AUTH_START' })
    try {
        const { data } = await AuthApi.logIn(formData);
        dispatch({ type: 'AUTH_SUCCESS', data: data })
    } catch (error) {
        console.log(error);
        dispatch({ type: 'AUTH_FAIL' })
    }
}



export const signUp = (formData) => async (dispatch) => {
    dispatch({ type: 'AUTH_START' });
    try {
        const { data } = await AuthApi.signUp(formData);
        if (data) {
            dispatch({ type: 'AUTH_SUCCESS', data: data });
        }
    } catch (error) {
        console.log("Signup Error:", error.response?.data || error.message);
        dispatch({ type: 'AUTH_FAIL', error: error.response?.data?.message || "Signup failed" });
    }
};


export const logOut = () => async (dispatch) => {
    dispatch({ type: "LOG_OUT" })
}