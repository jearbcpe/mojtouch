import axios from 'axios';
import RNFS from 'react-native-fs'
import Geolocation from '@react-native-community/geolocation';
import { URL_WS_ATTEND } from '../../../constants'
import AsyncStorage from '@react-native-community/async-storage';


export const checkIn = async (token, userId, divnId, camera) => {
  if (camera) {
    camera.pausePreview();
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    const filepath = data.uri.split('//')[1];
    const imageUriBase64 = await RNFS.readFile(filepath, 'base64');
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition((info) => {
        var lat = info.coords.latitude;
        var long = info.coords.longitude;
        // return new Promise((resolve,reject)=>{
        //var url_ws_attend = "https://portal.moj.go.th/ws/attend.php/checkInMobile";
        axios.post(URL_WS_ATTEND + "checkInMobile", 
          { 
            token: token,
            userId: userId, 
            d_id: divnId, 
            platform: 'mobile',
            checkInLat : lat, 
            checkInLong : long,
            checkInImage : 
            { 
              fileType : 'jpg',
              oldfileName : 'checkIn_' + token,
              fileBase64 : imageUriBase64
            }
          })
          .then(res => {

            var rs = res.data;
            if (rs.status == "success") {
              var cktime = rs.datetime.split(' ')[1];
              return resolve({status:true ,time : cktime.substring(0, cktime.length - 3),inside : false});
            }
            else {
              return resolve({status : false});
            }
          })
          .catch(error => {
            console.error(error)
          })
        //})
      });
    })
  }
}

export const checkOut = async (token, userId, divnId, camera) => {
  
  if (camera) {
    //camera.pausePreview();

    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    const filepath = data.uri.split('//')[1];
    const imageUriBase64 = await RNFS.readFile(filepath, 'base64');
    camera.pausePreview();

    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition((info) => {
        var lat = info.coords.latitude;
        var long = info.coords.longitude;
       
        //var url_ws_attend = "https://portal.moj.go.th/ws/attend.php/checkOutMobile";
          axios.post(URL_WS_ATTEND + "checkOutMobile", 
          { 
            token: token,
            userId: userId, 
            d_id: divnId, 
            platform: 'mobile',
            checkOutLat : lat, 
            checkOutLong : long,
            checkOutImage : 
              { 
                fileType : 'jpg',
                oldfileName : 'checkOut_' + token,
                fileBase64 : imageUriBase64
              }
          })
          .then(res => {

            var rs = res.data;

            if (rs.status == "success") {
              var cktime = rs.datetime.split(' ')[1];
              return resolve({status:true ,time : cktime.substring(0, cktime.length - 3),inside : false});
            }
            else {
              resolve({status : false});
            }
          })
          .catch(error => {
            console.error(error)
          })

      });
    })
  }
}

export const getTimeAttend = () => { 
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('storeData').then((jsonValue) => {
      
      var stateData = JSON.parse(jsonValue)
      if(stateData  != null){
        var token = stateData.token;
        var userId = stateData.userId;
        console.log(userId)
        axios.post(URL_WS_ATTEND + "getTimeAttend", { token: token , userId : userId })
        .then( result => {
          var data = result.data;
        
          var checkInTime = (data.checkInDate != null) ? data.checkInDate.split(' ')[1].substring(0, 5) : ' -- . --';
          var checkOutTime = (data.checkOutDate != null) ? data.checkOutDate.split(' ')[1].substring(0, 5) : ' -- . --';
          console.log(data);
          return resolve( 
            { checkInTime : checkInTime ,
              checkOutTime : checkOutTime ,
              checkInLocation : data.checkInLocation ,
              checkOutLocation : data.checkOutLocation 
            } );
        })
        .catch(error => {
          console.error(error)
        })
      }
    });
  })
}