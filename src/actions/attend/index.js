import { 
    FETCHING_DATA,
    FETCHING_DATA_FAILURE,
    ACTION_CHECKIN,
    ACTION_CHECKOUT,
    ACTION_CANCELCHECK,
    ACTION_SWITCHLOCATION
} from '../../constants';
import { checkIn,checkOut,getTimeAttend } from '../../services/api/attend';

export const setStageToCancelCheck = () => ({
    type : ACTION_CANCELCHECK
});
export const setStageToCheckIn = (data) => ({
    type: ACTION_CHECKIN,
    payload : data
});

export const setStageToCheckOut = (data) => ({
    type: ACTION_CHECKOUT,
    payload : data
});

export const setStageToSwitchLocation = () => ({
    type : ACTION_SWITCHLOCATION
})

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
            checkOut(token,userId,divnId,camera).then(result=>{
                if(result.status)
                    dispatch(setStageToCheckOut(result))
            })
            .catch(error=>{
                dispatch(setStageToFailure())
            })
        }
        else{
            checkIn(token,userId,divnId,camera).then(result=>{
                if(result.status)
                    dispatch(setStageToCheckIn(result))
            })
            .catch(error=>{
                dispatch(setStageToFailure())
            })
        }
       
    }
}

export const cancelCheck = () => {
    return (dispatch)=>{
        dispatch(setStageToCancelCheck())
    }
}

export const switchLocation = () => {
    return (dispatch) => {
        dispatch(setStageToSwitchLocation())
    }
}
