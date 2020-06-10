import { FETCHING_DATA,
    FETCHING_DATA_SUCCESS,
    FETCHING_DATA_FAILURE,
    FETCHING_LOGIN
} from '../constants'

const initialState = {
    data:[],
    active : false,
    isFetching: false,
    isError: false
}

export default (state = initialState, {type,payload}) => {
    switch (type) {

    case FETCHING_DATA:
        return { ...state, isFetching : true , data:[]};

    case FETCHING_DATA_SUCCESS:
        return { ...state,isFetching : false ,data: payload };

    case FETCHING_DATA_FAILURE:
        return { ...state, isFetching : false };

    case FETCHING_LOGIN:
        return { ...state, active : payload};

    default:
        return state
    }
}
