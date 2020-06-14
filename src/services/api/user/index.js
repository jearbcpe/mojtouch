import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { URL_WS_USER,URL_WS_ATTEND } from '../../../constants'
/*
export const login = (username,password)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            var result = false;
            if(username == "teerapon")
                result = true;
                return resolve(result)
        },1000)
    })
}
*/

export const verifyToken = () => {
  //const jsonValue = await AsyncStorage.getItem('storeData')

  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('storeData').then((jsonValue) => {
      var stateData = JSON.parse(jsonValue)
      var token = stateData.token;
      
      var userId = stateData.userId;
      var divnId = stateData.divnId;
      //const url_ws_user = "https://portal.moj.go.th/ws/user.php/verifyUser";
      //const url_ws_attend = "https://portal.moj.go.th/ws/attend.php/checkAlreadyCheckIn";
  
      axios.post(URL_WS_USER, { token: token })
        .then(res => {
          var rs = res.data;
            
          if (rs.status != "success") {
  
            axios.post(URL_WS_ATTEND, { token: token, userId: userId })
              .then(resChk => {
                var rsChk = resChk.data;
                var checked = false
               
                storeData({ token: token, userId: userId, divnId: divnId }); //AsyncStorage for token
                if (rsChk.status == "success") {
  
                  if (rsChk.checked == "1")
                    checked = true;
                  else if (rsChk.checked == "0")
                    checked = false;
  
                  return resolve({ token: token, userId: userId, divnId: divnId, active: true, alreadyCheckIn: checked });
  
                } else {
                  return resolve({ token: token, userId: userId, divnId: divnId, active: true, alreadyCheckIn: false });
                }
              })
              .catch(error => {
                console.error(error)
              })
          } else {
            return resolve({ active: false });
          }
  
        })
        .catch(error => {
          console.error(error)
        })
    });
    
    });
    
}

export const login = (username, password) => {
  return new Promise((resolve, reject) => {
    //const url_ws_user = "https://portal.moj.go.th/ws/user.php/verifyUser";
    //const url_ws_attend = "https://portal.moj.go.th/ws/attend.php/checkAlreadyCheckIn";
    axios.post(URL_WS_USER, { username: username, password: password })
      .then(res => {
        var rs = res.data;
        if (rs.status == "success") {
          axios.post(URL_WS_ATTEND, { token: rs.token, userId: rs.userId })
            .then(resChk => {
              var rsChk = resChk.data;
              var checked = false
              storeData({ token: rs.token, userId: rs.userId, divnId: rs.d_id }); //AsyncStorage for token
              if (rsChk.status == "success") {

                if (rsChk.checked == "1")
                  checked = true;
                else if (rsChk.checked == "0")
                  checked = false;
                storeData({ token: rs.token, userId: rs.userId, divnId: rs.d_id }); //AsyncStorage for token
                var userData = [{ status: rs.status, token: rs.token, userId: rs.userId, divnId: rs.d_id, alreadyCheckIn: checked }];
                return resolve(userData);

              } else {
                storeData({ token: rs.token, userId: rs.userId, divnId: rs.d_id }); //AsyncStorage for token
                var userData = [{ status: rs.status, token: rs.token, userId: rs.userId, divnId: rs.d_id, alreadyCheckIn: false }];
                return resolve(userData);
              }
            })
            .catch(error => {
              console.error(error)
            })


          //return (true)
        }
        else if (rs.status == "fail") {
          return resolve(false);
        }
      })
      .catch(error => {
        console.error(error)
      })
  })
}

storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('storeData', jsonValue)
  } catch (e) {
    // saving error
  }
}