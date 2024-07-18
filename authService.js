const {getByEmail} = require('./repository');

function login(data){
    res = {
        accessToken: getAccessToken(data)
    }
    return res;
}

function checkSignature(token){
    console.log('Checking signature ..');
}

function getAccessToken(data){
    
    user = getByEmail(data.email);    
    
    // Convert string to Buffer
    const buffer = Buffer.from(JSON.stringify(user), 'utf-8');

    // Convert Buffer to Base64 string
    return buffer.toString('base64');
}

function decodeId(token){    
    // Convert Base64 string to Buffer
    const buffer = Buffer.from(JSON.stringify(token), 'base64');

    // Convert Buffer to original string
    user = buffer.toString('utf-8');
    jUser = JSON.parse(user);

    return jUser
}

module.exports = { login, decodeId, getByEmail, checkSignature }