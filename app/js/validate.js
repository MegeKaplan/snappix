




const validate = (string, label, minLength=0, maxLength=999) => {
    var errMsg = undefined
    
    if(string.length<minLength){errMsg = `The ${label} you enter must be longer than ${minLength-1} characters.`}
    if(string.length>maxLength){errMsg = `The ${label} you enter must be shorter than ${maxLength+1} characters.`}

    // Return
    if(errMsg==undefined){
        return true
    }else{
        return errMsg
    }
};

export { validate };
