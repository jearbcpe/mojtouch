const people = [
    { name : 'Lek',position : 'Father'},
    { name : 'Jeab',position : 'Son'},
]

export default ()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            return resolve(people)
        },1000)
    })
}