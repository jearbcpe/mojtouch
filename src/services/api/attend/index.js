import axios from 'axios';
import RNFS from 'react-native-fs'
import Geolocation from '@react-native-community/geolocation';
import { URL_WS_ATTEND, URL_WS_MASTER } from '../../../constants'
import AsyncStorage from '@react-native-community/async-storage';


export const findLocation = async (camera) => {
  return new Promise((resolve, reject) => {
    const options = { quality: 0.5, base64: true };
    camera.takePictureAsync(options).then(imgData => {
      camera.pausePreview();
      Geolocation.getCurrentPosition((info) => {
        var lat = info.coords.latitude;
        var long = info.coords.longitude;
        const filepath = imgData.uri.split('//')[1];
        RNFS.readFile(filepath, 'base64').then(imgBase64 => {
          return resolve({ lat: lat, long: long, imgBase64, imgBase64 });
        });

      }, (error) => { console.log(error) }, { maximumAge: 15000, timeout: 200000 })
    })


  })
}

export const tempCheckIn = async (token, userId, divnId, imgBase64, lat, long) => {


  //if (camera) {
  /* const options = { quality: 0.5, base64: true };
  const data = await camera.takePictureAsync(options);
  const filepath = data.uri.split('//')[1];
  const imageUriBase64 = await RNFS.readFile(filepath, 'base64');
  camera.pausePreview(); */
  return new Promise((resolve, reject) => {
    //Geolocation.getCurrentPosition((info) => {
    //var lat = info.coords.latitude;
    //var long = info.coords.longitude;

    axios.post(URL_WS_ATTEND + "confirmCheckIn",
      {
        token: token,
        userId: userId,
        d_id: divnId,
        platform: 'mobile',
        checkInLat: lat,
        checkInLong: long,
        checkInImage:
        {
          fileType: 'jpg',
          oldfileName: 'checkIn_' + token,
          fileBase64: imgBase64
        }
      })
      .then(res => {

        var rs = res.data;
        //console.log(rs.status)
        if (rs.status == "success") {
          var cktime = rs.datetime.split(' ')[1];
          var isInside = false;
          if (rs.checkinLocation == "inside")
            isInside = true;
          return resolve({
            status: true,
            time: cktime.substring(0, cktime.length - 3),
            tempId: rs.tempId, inside: isInside
          });
        }
        else {
          return resolve({ status: false });
        }
      })
      .catch(error => {
        console.error(error)
      })
    //})
    //},(error) => {console.log(error)},{maximumAge:5000,timeout:200000});
  })
  //}
}

export const tempCheckOut = async (token, userId, divnId, imgBase64, lat, long) => {

  //if (camera) {
  //camera.pausePreview();

  /* const options = { quality: 0.5, base64: true };
  const data = await camera.takePictureAsync(options);
  const filepath = data.uri.split('//')[1];
  const imageUriBase64 = await RNFS.readFile(filepath, 'base64');
  camera.pausePreview(); */

  return new Promise((resolve, reject) => {
    // Geolocation.getCurrentPosition((info) => {
    // var lat = info.coords.latitude;
    //  var long = info.coords.longitude;
    axios.post(URL_WS_ATTEND + "confirmCheckOut",
      {
        token: token,
        userId: userId,
        d_id: divnId,
        platform: 'mobile',
        checkOutLat: lat,
        checkOutLong: long,
        checkOutImage:
        {
          fileType: 'jpg',
          oldfileName: 'checkOut_' + token,
          fileBase64: imgBase64
        }
      })
      .then(res => {

        var rs = res.data;

        if (rs.status == "success") {
          var cktime = rs.datetime.split(' ')[1];
          //console.log(rs.checkoutLocation);
          var isInside = false;
          if (rs.checkoutLocation == "inside")
            isInside = true;
          return resolve({
            status: true,
            time: cktime.substring(0, cktime.length - 3),
            tempId: rs.tempId, inside: isInside
          });
        }
        else {
          resolve({ status: false });
        }
      })
      .catch(error => {
        console.error(error)
      })

    // },(error) => {console.log(error)},{maximumAge:5000,timeout:200000});
  })
  //}
}

export const getTimeAttend = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('storeData').then((jsonValue) => {

      var stateData = JSON.parse(jsonValue)
      if (stateData != null) {
        var token = stateData.token;
        var userId = stateData.userId;
        //console.log(userId)
        axios.post(URL_WS_ATTEND + "getTimeAttend", { token: token, userId: userId })
          .then(result => {
            var data = result.data;

            var checkInTime = (data.checkInDate != null) ? data.checkInDate.split(' ')[1].substring(0, 5) : ' -- . --';
            var checkOutTime = (data.checkOutDate != null) ? data.checkOutDate.split(' ')[1].substring(0, 5) : ' -- . --';

            return resolve(
              {
                checkInTime: checkInTime,
                checkOutTime: checkOutTime,
                checkInLocation: data.checkInLocation,
                checkOutLocation: data.checkOutLocation
              }
            );


          })
          .catch(error => {
            console.error(error)
          })
      }
    });
  })
}

export const confirmChk = (tempId, typeCheck, isInside) => {
  return new Promise((resolve, reject) => {
    var type = '';
    var location = 'outside';
    if (isInside == true)
      location = 'inside';
    //console.log(isInside)
    var sendData = {};
    if (typeCheck == "IN") {
      type = 'checkInMobile';
      sendData = { tempId: tempId, checkinLocation: location };
    }
    else if (typeCheck == "OUT") {
      type = 'checkOutMobile';
      sendData = { tempId: tempId, checkoutLocation: location };
    }


    axios.post(URL_WS_ATTEND + type, sendData)
      .then(result => {
        var data = result.data;

        if (data.status == "success") {
          return resolve(true);
        }
        else {
          return resolve(false);
        }
      })
      .catch(error => {
        console.error(error)
      })
  });
};

export const getTime = () => {
  return new Promise((resolve, reject) => {
    axios.post(URL_WS_MASTER + 'getTime')
      .then(rsTime => {
        var currentTime = rsTime.data.time;
        //var currentSecond = rsTime.data.time.substring(6, 8);
        return resolve({ currentTime: currentTime });
      })
  })
}