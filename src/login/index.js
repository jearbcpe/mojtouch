import { FETCHING_LOGIN, FETCHING_DATA,FETCHING_DATA_FAILURE } from '../constants'
import loadData from './api'

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

export const userLogin = () =>{
    return (dispatch)=>{
        dispatch(setStageToFetching());
        loadData()
        .then(result=>{
            dispatch(setStageToLogin(result))
        })
        .catch(error=>{
            dispatch(setStageToFailure())
        })
    }
}
