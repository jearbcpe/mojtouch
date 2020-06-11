const active = true

export default (username)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log(username)
            return resolve(active)
        },1000)
    })
}