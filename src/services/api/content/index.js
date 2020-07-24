import axios from 'axios';
import { URL_WS_NEWS,URL_WS_LISTNEWS } from '../../../constants'

export const getContentNews = (divnId) => {
    return new Promise((resolve, reject) => {
        var arrNews = [];
        axios.post(URL_WS_LISTNEWS,{ann_type: '4',d_id:divnId}).then(
            rs => {
                var data = rs.data;
                //console.log(rs)
                for(var x in data){
                    //console.log(data[x].fileList[0].new_file_name)
                    //console.log(data[x].news_type)
                    //console.log(data[x].widthMore)
                    var widthMore = false;
                        if(data[x].widthMore=="1")
                            widthMore = true;
                        if(data[x].news_type == 'image'){
                           
                            if(data[x].fileList.length != 0){
                              
                                 arrNews.push(
                                    {
                                        id: data[x].ann_id,
                                        divnLogo : data[x].d_icon,
                                        title: data[x].ann_name,
                                        divnName : data[x].d_name,
                                        newsDetail : data[x].ann_description,
                                        datetime : data[x].create_date,
                                        newsImage : data[x].fileList[0].new_file_name,
                                        widthMore : widthMore
                                    }
                                )
                                

                            }
                               
                        } 
                }
                return resolve(arrNews);
                                 
             
    });
}
    )}
