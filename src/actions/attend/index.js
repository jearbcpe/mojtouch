import { 
    FETCHING_DATA,
    FETCHING_DATA_FAILURE,
    ACTION_CHECKIN,
    ACTION_CHECKOUT,
    ACTION_CANCELCHECK,
    ACTION_SWITCHLOCATION,
    ACTION_CONFIRMCHECK,
    GET_CURRENTTIME,
    SET_UPDATETIMEMIN
} from '../../constants';
import { tempCheckIn,tempCheckOut,getTimeAttend,confirmChk,getTime } from '../../services/api/attend';

export const setStageToUpdateTimeMin = () => ({
    type : SET_UPDATETIMEMIN
});

export const setStateGetCurrrentTime = (data) => ({
    type : GET_CURRENTTIME,
    payload : data
})
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

export const setStateConfirmCheck = (data) => ({
    type : ACTION_CONFIRMCHECK,
    payload : data
})

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
            tempCheckOut(token,userId,divnId,camera).then(result=>{
                if(result.status)
                    dispatch(setStageToCheckOut(result))
            })
            .catch(error=>{
                dispatch(setStageToFailure())
            })
        }
        else{
            tempCheckIn(token,userId,divnId,camera).then(result=>{
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

export const confirmCheck = (tempId,typeCheck,isInside,camera) =>{
    
    camera.resumePreview();
    return (dispatch)=>{
        dispatch(setStageToFetching());
        confirmChk(tempId,typeCheck,isInside).then(result=>{
            if(result){
                getTimeAttend()
                .then(rsTA => {
                    dispatch(setStateConfirmCheck({ logTA : rsTA , rsConfirm : result}))
                });
            }
        })
        .catch(error=>{
            dispatch(setStageToFailure())
        })
                 
    }
}

export const getCurrentTime = () =>{
    return (dispatch)=>{
        dispatch(setStageToFetching());
        getTime().then(result=>{
            dispatch(setStateGetCurrrentTime(result))
        })
        .catch(error=>{
            dispatch(setStageToFailure())
        })
                 
    }
}

export const updateTimeMin = () => {
    return (dispatch) => {
        dispatch(setStageToUpdateTimeMin())
    }
}