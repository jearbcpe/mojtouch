import { FETCHING_DATA,
    FETCHING_DATA_SUCCESS,
    FETCHING_DATA_FAILURE,
    FETCHING_LOGIN,
    SET_USERNAME,
    SET_PASSWORD,
    ACTION_CHECKIN
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
    isError: false
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
            alreadyCheckIn : payload[0].alreadyCheckIn
        };

    case SET_USERNAME:
        return { ...state, username : payload }

    case SET_PASSWORD:
        return { ...state, password : payload }

    case ACTION_CHECKIN :
        return { ...state, alreadyCheckIn : payload}

    default:
        return state
    }
}
