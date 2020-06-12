import { 
    FETCHING_DATA,
    FETCHING_DATA_FAILURE,
    ACTION_CHECKIN,
    ACTION_CHECKOUT
} from '../../constants';
import { checkIn,checkOut } from '../../services/api/attend';


export const setStageToCheckIn = (data) => ({
    type: ACTION_CHECKIN,
    payload : data
});

export const setStageToCheckOut = () => ({
    type: ACTION_CHECKOUT
});

export const setStageToFetching = () => ({
    type: FETCHING_DATA
});

export const setStageToFailure = () => ({
    type: FETCHING_DATA_FAILURE,
});


export const userCheck = (alreadyCheckIn,token,userId,divnId,camera) =>{
    return (dispatch)=>{
        dispatch(setStageToFetching());
        if(alreadyCheckIn){
            checkOut(token,userId,camera).then(result=>{
                dispatch(setStageToCheckOut(result))
            })
            .catch(error=>{
                dispatch(setStageToFailure())
            })
        }
        else{
            checkIn(token,userId,divnId,camera).then(result=>{
                dispatch(setStageToCheckIn(result))
            })
            .catch(error=>{
                dispatch(setStageToFailure())
            })
        }
       
    }
}
/*
export const userCheckOut = (token,userId) =>{
    return (dispatch)=>{
        dispatch(setStageToFetching());
        checkOut(token,userId).then(result=>{
            dispatch(setStageToCheckOut(result))
        })
        .catch(error=>{
            dispatch(setStageToFailure())
        })
    }
}
*/