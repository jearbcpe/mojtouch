import { 
        FETCHING_LOGIN,
        FETCHING_DATA,
        FETCHING_DATA_FAILURE,
        SET_USERNAME,
        SET_PASSWORD 
} from '../../constants'
import { login } from '../../services/api/user'

export const setStageToUsername = (data) => ({
    type: SET_USERNAME,
    payload : data
})

export const setStageToPassword = (data) => ({
    type: SET_PASSWORD,
    payload : data
})

export const setStageToLogin = (data) => ({
    type: FETCHING_LOGIN,
    payload : data
})
export const setStageToFetching = () => ({
    type: FETCHING_DATA
})

export const setStageToFailure = () => ({
    type: FETCHING_DATA_FAILURE,
})

export const usernameChangeText = (username) =>{
    return (dispatch) => {
        dispatch(setStageToUsername(username))
    }
}

export const passwordChangeText = (password) =>{
    return (dispatch) => {
        dispatch(setStageToPassword(password))
    }
}

export const userLogin = (username,password) =>{
    return (dispatch)=>{
        dispatch(setStageToFetching());
        login(username,password)
        .then(result=>{
            dispatch(setStageToLogin(result))
        })
        .catch(error=>{
            dispatch(setStageToFailure())
        })
    }
}
