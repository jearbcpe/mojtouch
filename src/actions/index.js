import { FETCHING_DATA,
    FETCHING_DATA_SUCCESS,
    FETCHING_DATA_FAILURE,
    FETCHING_LOGIN
} from '../constants'
import loadData from './api'

export const setStageToLogin = (data) => ({
    type: FETCHING_LOGIN,
    payload : data
})

export const setStageToSuccess = (data) => ({
    type: FETCHING_DATA_SUCCESS,
    payload : data
})

export const setStageToFetching = () => ({
    type: FETCHING_DATA
})

export const setStageToFailure = () => ({
    type: FETCHING_DATA_FAILURE,
})

export const fetchData = () =>{
    return (dispatch)=>{
        dispatch(setStageToFetching());
        loadData()
        .then(result=>{
            dispatch(setStageToSuccess(result))
        })
        .catch(error=>{
            dispatch(setStageToFailure())
        })
    }
}
/*
export const userLogin = () => {
    return (dispatch)=>{
        dispatch(setStageToFetching());
        api.userLogin()
        .then(result=>{
            dispatch(setStageToSuccess(result))
        })
        .catch(error=>{
            dispatch(setStageToFailure())
        })
    }
}
*/