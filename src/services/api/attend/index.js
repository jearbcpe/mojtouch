import axios from 'axios';

export const checkIn = (token,userId,divnId) =>{
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
}

export const checkOut = (token,userId) =>{
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
}