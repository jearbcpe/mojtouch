import {
    FETCHING_DATA,
    FETCHING_DATA_FAILURE,
    ACTION_CHECKIN,
    ACTION_CHECKOUT,
    ACTION_CANCELCHECK,
    ACTION_SWITCHLOCATION,
    ACTION_CONFIRMCHECK,
    GET_CURRENTTIME,
    SET_UPDATETIMEMIN,
    FETCHING_FINDLOCATION,
    FETCHING_UPLOADCHECKIMAGE
} from '../../constants';
import { tempCheckIn, tempCheckOut, getTimeAttend, confirmChk, getTime, findLocation } from '../../services/api/attend';

export const setStageToFindLocation = () => ({
    type: FETCHING_FINDLOCATION
});

export const setStageToUploadCheckImage = () => ({
    type: FETCHING_UPLOADCHECKIMAGE
});

export const setStageToUpdateTimeMin = () => ({
    type: SET_UPDATETIMEMIN
});

export const setStateGetCurrrentTime = (data) => ({
    type: GET_CURRENTTIME,
    payload: data
})
export const setStageToCancelCheck = () => ({
    type: ACTION_CANCELCHECK
});
export const setStageToCheckIn = (data) => ({
    type: ACTION_CHECKIN,
    payload: data
});

export const setStageToCheckOut = (data) => ({
    type: ACTION_CHECKOUT,
    payload: data
});

export const setStateConfirmCheck = (data) => ({
    type: ACTION_CONFIRMCHECK,
    payload: data
})

export const setStageToSwitchLocation = () => ({
    type: ACTION_SWITCHLOCATION
})

export const setStageToFetching = () => ({
    type: FETCHING_DATA
});

export const setStageToFailure = () => ({
    type: FETCHING_DATA_FAILURE,
});


export const userCheck = (alreadyCheckIn, token, userId, divnId, camera) => {
    return (dispatch) => {
        //updateTimeMin();
        getCurrentTime();
        dispatch(setStageToFetching());
        dispatch(setStageToFindLocation());
        findLocation(camera).then(rsLocation => {
            dispatch(setStageToUploadCheckImage())
            if (alreadyCheckIn) {
                tempCheckOut(token, userId, divnId, rsLocation.imgBase64, rsLocation.lat, rsLocation.long).then(result => {
                    if (result.status)
                        dispatch(setStageToCheckOut(result))
                })
                    .catch(error => {
                        dispatch(setStageToFailure())
                    })
            } else {
                tempCheckIn(token, userId, divnId,  rsLocation.imgBase64, rsLocation.lat, rsLocation.long).then(result => {
                    if (result.status)
                        dispatch(setStageToCheckIn(result))
                })
                    .catch(error => {
                        dispatch(setStageToFailure())
                    })
            }
        })

    }

}

export const cancelCheck = (camera) => {
    camera.resumePreview();
    return (dispatch) => {
        dispatch(setStageToCancelCheck())
    }
}

export const switchLocation = () => {
    return (dispatch) => {
        dispatch(setStageToSwitchLocation())
    }
}

export const confirmCheck = (tempId, typeCheck, isInside, camera) => {

    camera.resumePreview();
    return (dispatch) => {
        dispatch(setStageToFetching());
        confirmChk(tempId, typeCheck, isInside).then(result => {
            if (result) {
                getTimeAttend()
                    .then(rsTA => {
                        dispatch(setStateConfirmCheck({ logTA: rsTA, rsConfirm: result }))
                    });
            }
        })
            .catch(error => {
                dispatch(setStageToFailure())
            })

    }
}

export const getCurrentTime = () => {
    return (dispatch) => {
       
        //ispatch(setStageToFetching());
        getTime().then(result => {
            dispatch(setStateGetCurrrentTime(result))
        })
            .catch(error => {
                dispatch(setStageToFailure())
            })
    }
}

export const updateTimeMin = () => {
    return (dispatch) => {
        dispatch(setStageToUpdateTimeMin())
    }
}