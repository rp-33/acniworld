const boolLikes = (array,userId) =>{
    if(array.length===0) return false;
    let bool = false;
    for(let i =0;i<array.length;i++){
        if(array[i]==userId){
            bool = true;
            break;
        }
        
    }
    return bool
}


export {
    boolLikes
}