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
    ACTION_LOGOUT
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
    waitConfirm : false
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
            active : payload[0].status ,
            token : payload[0].token,
            userId : payload[0].userId ,
            divnId : payload[0].divnId ,
            alreadyCheckIn : payload[0].alreadyCheckIn,
            username : '',
            password : '',
            isFetching: false,
            isError: false,
            waitConfirm : false
        };

    case SET_USERNAME:
        return { ...state, username : payload }

    case SET_PASSWORD:
        return { ...state, password : payload }

    case ACTION_CHECKIN :
        return { ...state, alreadyCheckIn : payload,waitConfirm : payload}

    case ACTION_CHECKOUT :
            return { ...state ,waitConfirm : payload }

    case ACTION_VERIFYTOKEN :
        return { ...state ,
             token : payload.token ,
              userId : payload.userId ,
               divnId : payload.divnId ,
                active : true ,
                 alreadyCheckIn : payload.alreadyCheckIn,
                 waitConfirm : false
            }
        
    
    case ACTION_EXPIRETOKEN :
        return { ...state ,
        token : '',
        userId : '',
        divnId : '',
        username : '',
        password : '',
        active : false,
        alreadyCheckIn : false,
        isFetching: false,
        isError: false ,
        waitConfirm : false
    }

    case ACTION_LOGOUT:
        return { ...state ,
        token : '',
        userId : '',
        divnId : '',
        username : '',
        password : '',
        active : false,
        alreadyCheckIn : false,
        isFetching: false,
        isError: false,
        waitConfirm : false
    }

    default:
        return state
    }
}
