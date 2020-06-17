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
    ACTION_SWITCHLOCATION
} from '../constants'

const initialState = {
    data:[],
    token : '',
    userId : '',
    divnId : '',
    username : '',
    password : '',
    active : false,
    alreadyCheckIn : false,
    isFetching: false,
    isError: false,
    waitConfirm : false,
    timeCheckConfirm : '',
    typeCheckConfirm : '',
    insideCheckConfirm : false,
    checkInTime : '',
    checkOutTime : '',
    checkInLocation : '',
    checkOutLocation : ''
}

export default (state = initialState, {type,payload}) => {
    console.log(state)
    switch (type) {
    case FETCHING_DATA:
        return { ...state, isFetching : true , data:[]};

    case FETCHING_DATA_SUCCESS:
        return { ...state,isFetching : false ,data: payload };

    case FETCHING_DATA_FAILURE:
        return { ...state, isFetching : false };

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
            checkOutLocation : payload.logTA.checkOutLocation
        };

    case SET_USERNAME:
        return { ...state, username : payload }

    case SET_PASSWORD:
        return { ...state, password : payload }

    case ACTION_CHECKIN :
        return { ...state,waitConfirm : payload.status , timeCheckConfirm : payload.time , typeCheckConfirm : 'IN' , insideCheckConfirm : payload.inside}

    case ACTION_CHECKOUT :
            return { ...state ,waitConfirm : payload.status , timeCheckConfirm : payload.time , typeCheckConfirm : 'OUT' }

    case ACTION_CONFIRMCHECK : 
            return { ...state ,
                waitConfirm : false ,
                timeCheckConfirm : '' ,
                typeCheckConfirm : '',
                checkInTime : payload.logTA.checkInTime,
                checkOutTime : payload.logTA.checkOutTime,
                checkInLocation : payload.logTA.checkInLocation,
                checkOutLocation : payload.logTA.checkOutLocation
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
            checkOutLocation : payload.logTA.checkOutLocation
        }
    
    case ACTION_EXPIRETOKEN :
        return { initialState }

    case ACTION_SWITCHLOCATION : 
        return { ...state , insideCheckConfirm : !state.insideCheckConfirm }

    case ACTION_LOGOUT:
        return { initialState }

    case ACTION_CANCELCHECK : 
        return {...state , waitConfirm:false}

    default:
        return state
    }
}
