import axios from 'axios';
import { URL_WS_NEWS } from '../../../constants'

export const getContentNews = () => {
    return new Promise((resolve, reject) => {
       
        axios.get(URL_WS_NEWS)
        .then( result => {
        var data = result.data;
        var arrNews = [];
       
        for(var x in data){
            if(x==20)
                break;
            var widthMore = false;

            if(data[x].widthMore==true)
                widthMore = true;
            if(data[x].newsImage != ''){
                arrNews.push(
                    {
                        id: data[x].newsId,
                        divnLogo : data[x].newsIconDivn,
                        title: data[x].newsLabelShort,
                        divnName : data[x].newsDivnName,
                        newsDetail : data[x].newsDetail,
                        datetime : data[x].newsDate,
                        newsImage : data[x].newsImage[0],
                        widthMore : widthMore
                    }
                )
            }
            
           
        } 
        return resolve(arrNews);
        })
        .catch(error => {
        console.error(error)
        })
    });
}

