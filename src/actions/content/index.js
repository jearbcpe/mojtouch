import { 
    FETCHING_DATA,
    FETCHING_DATA_FAILURE,
    ACTION_GETNEWS
} from '../../constants';
import { getContentNews } from '../../services/api/content';

export const setStageToGetNews = (data) => ({
    type : ACTION_GETNEWS,
    payload : data
});

export const setStageToFetching = () => ({
    type: FETCHING_DATA
});

export const setStageToFailure = () => ({
    type: FETCHING_DATA_FAILURE,
});


export const getNews = () =>{
    return (dispatch)=>{
        dispatch(setStageToFetching());
        getContentNews().then(result=>{  
                dispatch(setStageToGetNews(result))
        })
        .catch(error=>{
            dispatch(setStageToFailure())
        })
    }
}
