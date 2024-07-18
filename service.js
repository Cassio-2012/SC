const {save, getById} = require('./repository');
const {decodeId, checkSignature} = require('./authService')

function signup(userData){    
    user = save(userData);
    return user;
}

function getUser(id, header){

    checkSignature(header);
    user = getById(id);           
    return user;
}

function isAuthorized(token, userId){
    
    user = decodeId(token);        

    if(user.id != userId) return false;

    return true;
}

module.exports = {signup, getUser, isAuthorized};