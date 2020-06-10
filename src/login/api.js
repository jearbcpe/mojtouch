const active = true

export default ()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            return resolve(active)
        },1000)
    })
}