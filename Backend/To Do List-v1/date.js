let getDate = function(){
    const today = new Date(); 
    const options={
                weekday:"long",
                day:"numeric",
                month:"long"
            };
    return today.toLocaleDateString("en-US",options);
}

let getDay = function(){
    const today = new Date();
    const options={
        weekday:"long"
    };    
    return today.toLocaleDateString("en-US",options); 
}

export default getDate; 
export {getDate,getDay};