import {
    FETCHING_LOGIN,
    FETCHING_DATA,
    FETCHING_DATA_FAILURE,
    SET_USERNAME,
    SET_PASSWORD,
    ACTION_VERIFYTOKEN,
    ACTION_LOGOUT
} from '../../constants'
import { login, logout, verifyToken } from '../../services/api/user'
import { getTimeAttend, getTime } from '../../services/api/attend'
import { getContentNews } from '../../services/api/content';

export const setStageToUsername = (data) => ({
    type: SET_USERNAME,
    payload: data
})

export const setStageToPassword = (data) => ({
    type: SET_PASSWORD,
    payload: data
})

export const setStageToLogin = (data) => ({
    type: FETCHING_LOGIN,
    payload: data
})

export const setStateToLogout = () => ({
    type: ACTION_LOGOUT
})

export const setStageToVerifyToken = (data) => ({
    type: ACTION_VERIFYTOKEN,
    payload: data
})

export const setStageToExpireToken = () => ({
    type: ACTION_EXPIRETOKEN
})

export const setStageToFetching = () => ({
    type: FETCHING_DATA
})

export const setStageToFailure = () => ({
    type: FETCHING_DATA_FAILURE,
})

export const usernameChangeText = (username) => {
    return (dispatch) => {
        dispatch(setStageToUsername(username))
    }
}

export const passwordChangeText = (password) => {
    return (dispatch) => {
        dispatch(setStageToPassword(password))
    }
}

export const userLogout = (token) => {
    return (dispatch) => {

        dispatch(setStageToFetching());
        logout(setStageToExpireToken)
            .then(result => {
                if (result)
                    dispatch(setStateToLogout())
            })
            .catch(error => {
                dispatch(setStageToFailure())
            })
    }
}

export const userLogin = (username, password) => {
    return (dispatch) => {

        dispatch(setStageToFetching());
        login(username, password)
            .then(rsUser => {
                //dispatch(setStageToLogin(rsUser))

                getTimeAttend()
                    .then(rsTA => {
                        getContentNews().then(rsContent => {
                            getTime().then(rsTime => {
                                dispatch(setStageToLogin({
                                    userData: rsUser, logTA: rsTA, rsContent: rsContent,rsTime:rsTime
                                }))
                            })
                            .catch(error => {
                                dispatch(setStageToFailure())
                            })

                        })
                            .catch(error => {
                                dispatch(setStageToFailure())
                            })

                    });

            })
            .catch(error => {
                dispatch(setStageToFailure())
            })
    }
}

export const checkStillOnline = () => {

    return (dispatch) => {
        //dispatch(setStageToFetching());
        getTime();
        verifyToken()
            .then(rsToken => {
                console.log(rsToken)
                if (!rsToken.active)
                    dispatch(setStageToExpireToken())
                else if (rsToken.active) {
                    getTimeAttend()
                        .then(rsTA => {
                            getContentNews().then(rsContent => {
                                getTime().then(rsTime => {
                                    dispatch(setStageToVerifyToken({
                                        userData: rsToken, logTA: rsTA, rsContent: rsContent , rsTime : rsTime
                                    }))
                                })
                                .catch(error => {
                                    dispatch(setStageToFailure())
                                })
                               
                            })
                                .catch(error => {
                                    dispatch(setStageToFailure())
                                })

                        });
                }
            })
            .catch(error => {
                dispatch(setStageToFailure())
            })
    }
}

export const setInterval = () => {


}
