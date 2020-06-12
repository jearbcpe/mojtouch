import axios from 'axios';
import RNFS from 'react-native-fs'
import Geolocation from '@react-native-community/geolocation';

export const checkIn = async (token, userId, divnId, camera) => {
  if (camera) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    const filepath = data.uri.split('//')[1];
    const imageUriBase64 = await RNFS.readFile(filepath, 'base64');
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition((info) => {

        var lat = info.coords.latitude;
        var long = info.coords.longitude;
        // return new Promise((resolve,reject)=>{
        var url_ws_attend = "https://portal.moj.go.th/ws/attend.php/checkIn";
        axios.post(url_ws_attend, { token: token, userId: userId, d_id: divnId, platform: 'mobile' })
          .then(res => {

            var rs = res.data;
            if (rs.status == "success") {
              console.log("check in success")
              return resolve(true);
            }
            else {
              return resolve(false);
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

export const checkOut = async (token, userId, camera) => {
  if (camera) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    const filepath = data.uri.split('//')[1];
    const imageUriBase64 = await RNFS.readFile(filepath, 'base64');
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition((info) => {
        var lat = info.coords.latitude;
        var long = info.coords.longitude;

        var url_ws_attend = "https://portal.moj.go.th/ws/attend.php/checkOut";
        axios.post(url_ws_attend, { token: token, userId: userId, platform: 'mobile' })
          .then(res => {

            var rs = res.data;

            if (rs.status == "success") {
              resolve(true);
            }
            else {
              resolve(false);
            }
          })
          .catch(error => {
            console.error(error)
          })

      });
    })
  }
}