import axios from 'axios';

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


export const login = (username,password) =>{
    return new Promise((resolve,reject)=>{
        const url_ws_user = "https://portal.moj.go.th/ws/user.php/verifyUser";   
        const url_ws_attend = "https://portal.moj.go.th/ws/attend.php/checkAlreadyCheckIn";
        axios.post(url_ws_user, { username: username, password: password })
        .then(res => {
          var rs = res.data;
          if (rs.status == "success") {
            axios.post(url_ws_attend, { token: rs.token, userId: rs.userId })
            .then(resChk => {
              var rsChk = resChk.data;
              var checked = false
              if (rsChk.status == "success") {

                if(rsChk.checked=="1")
                  checked = true;
                else if(rsChk.checked=="0")
                  checked = false;

                var userData = [{status:rs.status,token : rs.token, userId:rs.userId , divnId : rs.d_id, alreadyCheckIn : checked}];
                return resolve(userData);

              }
            })
            .catch(error => {
              console.error(error)
            })

            
            //return (true)
          }
          else if(rs.status == "fail"){
            return resolve(false);
          }
        })
        .catch(error => {
          console.error(error)
        })
    })
}