import axios from 'axios';
import RNFS from 'react-native-fs'
import Geolocation from '@react-native-community/geolocation';

export const checkIn = async (token,userId,divnId,camera) =>{
  if (camera) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    const filepath = data.uri.split('//')[1];
    const imageUriBase64 = await RNFS.readFile(filepath, 'base64');
    Geolocation.getCurrentPosition((info) => {
      
      var lat = info.coords.latitude;
      var long = info.coords.longitude;
      //console.log (lat);
    
    } );
    //console.log(x.c)
    //console.log(x);
    //console.log("lat : " + lat + " long : " + long)
  }
  /*
    return new Promise((resolve,reject)=>{
        var url_ws_user = "https://portal.moj.go.th/ws/attend.php/checkIn";
        axios.post(url_ws_user, { token: token, userId: userId, d_id : divnId, platform: 'mobile' })
        .then(res => {
          var rs = res.data;
          if (rs.status == "success") {
            resolve(true);
          }
        })
        .catch(error => {
          console.error(error)
        })
    })
    */
}

export const checkOut = async (token,userId,camera) =>{
  if (camera) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    const filepath = data.uri.split('//')[1];
    const imageUriBase64 = await RNFS.readFile(filepath, 'base64');
    Geolocation.getCurrentPosition((info) => {
      
      var lat = info.coords.latitude;
      var long = info.coords.longitude;
      //console.log(lat);
    
    } );
   
  }
  /*
  return new Promise((resolve,reject)=>{
      var url_ws_user = "https://portal.moj.go.th/ws/attend.php/checkOut";
      axios.post(url_ws_user, { token: token, userId: userId, platform: 'mobile' })
      .then(res => {
        var rs = res.data;
        if (rs.status == "success") {
          resolve(true);
        }
      })
      .catch(error => {
        console.error(error)
      })
  })
  */
}