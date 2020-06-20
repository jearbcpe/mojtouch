import { FETCHING_DATA,
    FETCHING_DATA_SUCCESS,
    FETCHING_DATA_FAILURE,
    FETCHING_LOGIN,
    SET_USERNAME,
    SET_PASSWORD,
    ACTION_CHECKIN,
    ACTION_CHECKOUT,
    ACTION_VERIFYTOKEN,
    ACTION_EXPIRETOKEN,
    ACTION_LOGOUT,
    ACTION_CANCELCHECK,
    ACTION_CONFIRMCHECK,
    ACTION_SWITCHLOCATION,
    ACTION_GETNEWS,
    GET_CURRENTTIME,
    SET_UPDATETIMEMIN,
    FETCHING_FINDLOCATION,
    FETCHING_UPLOADCHECKIMAGE
} from '../constants'

const initialState = {
    data:[],
    currentTime : '',
    currentSecond : 0,
    token : '',
    userId : '',
    divnId : '',
    username : '',
    password : '',
    active : false,
    alreadyCheckIn : false,
    waitConfirm : false,
    timeCheckConfirm : '',
    typeCheckConfirm : '',
    insideCheckConfirm : false,
    tempIdCheckConfirm : '',
    isEnableSwitchLocation : false,
    checkInTime : '',
    checkOutTime : '',
    checkInLocation : '',
    checkOutLocation : '',
    newsList : [],
    isFetching: false,
    isError: false,
    isFetchingLocation : false,
    isFetchingUploadCheckImage : false
}

export default (state = initialState, {type,payload}) => {
    //console.log(state.currentSecond)
    switch (type) {
    case FETCHING_DATA:
        return { ...state, isFetching : true , data:[]};

    case FETCHING_DATA_SUCCESS:
        return { ...state,isFetching : false ,data: payload };

    case FETCHING_DATA_FAILURE:
        return { ...state, isFetching : false };
    
    case FETCHING_FINDLOCATION:
        return { ...state, isFetchingLocation : true };

    case FETCHING_UPLOADCHECKIMAGE:
            return { ...state, isFetchingUploadCheckImage : true , isFetchingLocation : false };

    case GET_CURRENTTIME : 
        return { ...state , currentTime : payload.currentTime }

    case SET_UPDATETIMEMIN : 
        return { ...state , currentTime : updateTimeMin(state.currentTime) ,currentSecond : 0 }

    case FETCHING_LOGIN:
        return { 
            ...state,
            active : payload.userData[0].status ,
            token : payload.userData[0].token,
            userId : payload.userData[0].userId ,
            divnId : payload.userData[0].divnId ,
            alreadyCheckIn : payload.userData[0].alreadyCheckIn,
            username : '',
            password : '',
            isFetching: false,
            isError: false,
            waitConfirm : false,
            checkInTime : payload.logTA.checkInTime,
            checkOutTime : payload.logTA.checkOutTime,
            checkInLocation : payload.logTA.checkInLocation,
            checkOutLocation : payload.logTA.checkOutLocation,
            newsList : payload.rsContent,
            currentTime : payload.rsTime.currentTime
        };

    case SET_USERNAME:
        return { ...state, username : payload }

    case SET_PASSWORD:
        return { ...state, password : payload }

    case ACTION_CHECKIN :
        return { ...state,
                waitConfirm : payload.status,
                timeCheckConfirm : payload.time,
                typeCheckConfirm : 'IN',
                insideCheckConfirm : payload.inside,
                tempIdCheckConfirm : payload.tempId,
                isEnableSwitchLocation : payload.inside,
                isFetchingUploadCheckImage : false
            }

    case ACTION_CHECKOUT :
            return { ...state ,
                waitConfirm : payload.status ,
                timeCheckConfirm : payload.time ,
                typeCheckConfirm : 'OUT',
                insideCheckConfirm : payload.inside,
                tempIdCheckConfirm : payload.tempId,
                isEnableSwitchLocation : payload.inside,
                isFetchingUploadCheckImage : false
            }

    case ACTION_CONFIRMCHECK : 
            return { ...state ,
                waitConfirm : false ,
                timeCheckConfirm : '' ,
                typeCheckConfirm : '',
                insideCheckConfirm : false,
                tempIdCheckConfirm : '',
                alreadyCheckIn : true,
                checkInTime : payload.logTA.checkInTime,
                checkOutTime : payload.logTA.checkOutTime,
                checkInLocation : payload.logTA.checkInLocation,
                checkOutLocation : payload.logTA.checkOutLocation,
                isEnableSwitchLocation : false
            }

    case ACTION_VERIFYTOKEN :
        return { ...state ,
            token : payload.userData.token ,
            userId : payload.userData.userId ,
            divnId : payload.userData.divnId ,
            active : true ,
            alreadyCheckIn : payload.userData.alreadyCheckIn,
            waitConfirm : false,
            checkInTime : payload.logTA.checkInTime,
            checkOutTime : payload.logTA.checkOutTime,
            checkInLocation : payload.logTA.checkInLocation,
            checkOutLocation : payload.logTA.checkOutLocation,
            newsList : payload.rsContent,  
            currentTime : payload.rsTime.currentTime
        }
    
    case ACTION_EXPIRETOKEN :
        return { initialState }

    case ACTION_SWITCHLOCATION : 
        return { ...state , insideCheckConfirm : !state.insideCheckConfirm }

    case ACTION_LOGOUT:

        return { initialState }

    case ACTION_CANCELCHECK : 
        return {...state , waitConfirm:false}

    case ACTION_GETNEWS :
        return {...state , newsList : payload}
    default:
        return state
    }
}

export const updateTimeMin = (time) => {
    var hour = parseInt(time.split(':')[0]);
    var min = parseInt(time.split(':')[1]);
    var sec = parseInt(time.split(':')[2]);

    sec = sec + 1;
    if(sec == 60)
    {
        sec = 0;
        min = min + 1; 
        if(min == 60){
            min = 0;
            hour = hour + 1;
            if(hour == 24)
                hour = 0;
        }
    }

    return ('0' + hour).slice(-2) + ':' + ('0' + min).slice(-2)+ ':' + ('0' + sec).slice(-2) ;
}