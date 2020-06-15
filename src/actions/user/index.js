import { 
        FETCHING_LOGIN,
        FETCHING_DATA,
        FETCHING_DATA_FAILURE,
        SET_USERNAME,
        SET_PASSWORD,
        ACTION_VERIFYTOKEN,
        ACTION_LOGOUT
} from '../../constants'
import { login,logout,verifyToken } from '../../services/api/user'

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

export const setStateToLogout = () => ({
    type: ACTION_LOGOUT
})

export const setStageToVerifyToken = (data) =>({
    type : ACTION_VERIFYTOKEN,
    payload : data
})

export const setStageToExpireToken = () =>({
    type : ACTION_EXPIRETOKEN
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

export const userLogout = (token) => {
    return (dispatch)=>{
       
        dispatch(setStageToFetching());
        logout(setStageToExpireToken)
        .then(result=>{
            if(result)
                dispatch(setStateToLogout())
        })
        .catch(error=>{
            dispatch(setStageToFailure())
        })
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

export const checkStillOnline = () =>{
    
    return (dispatch)=>{
        //dispatch(setStageToFetching());
        
        verifyToken()
        .then(result=>{
            console.log(result)
            if(!result.active)
                dispatch(setStageToExpireToken())
            else if(result.active)
                dispatch(setStageToVerifyToken(result))

        })
        .catch(error=>{
            dispatch(setStageToFailure())
        })
    }
}
