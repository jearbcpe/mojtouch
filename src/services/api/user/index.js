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

        axios.post(url_ws_user, { username: username, password: password })
        .then(res => {
          var rs = res.data;
          if (rs.status == "success") {
            //SyncStorage.set('token', rs.token);
            //console.log("Token" + SyncStorage.get('token'));
  
            //this.setState({ verifyStatus: true, token: rs.token, userId: rs.userId, d_id: rs.d_id })
            //this.storeData(this.state);
            //this.checkAlreadyCheckIn();
            var userData = [{status:rs.status,token : rs.token, userId:rs.userId , divnId:rs.d_id}];
            return resolve(userData);
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