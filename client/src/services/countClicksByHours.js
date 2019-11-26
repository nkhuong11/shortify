const countClicksByHours = function(timeStamp, lastHours){
    const hours = 3600000*lastHours //miliseconds of an hour
    const current = new Date();
    const timePivot = new Date(current.getTime() - hours);
    let count = 0;
    const l = timeStamp.length;
    for(let i = 0; i < l; i++) {
        if (new Date(timeStamp[i]) > timePivot) {
            count++;
        }
    }
    
    return count
}

export default countClicksByHours;