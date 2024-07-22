let users = []
let count = 0

function loginUser(user, password, fp){

    count ++;

    user = JSON.stringify({id: count, user: user, password: password, fingerprint:fp});    
    users.push(user);

    return Buffer.from(user).toString('base64');    
}

function getClientId(token){
    
    
    // Decode Base64 to a Buffer
    const buffer = Buffer.from(token, 'base64');

    // Convert the Buffer to a string
    const decodedObj = JSON.parse(buffer.toString('utf-8'));
    
    return decodedObj.fingerprint; 
}

module.exports = {loginUser, getClientId};