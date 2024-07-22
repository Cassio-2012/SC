const CryptoJS = require("crypto-js");

const { getClientId } = require('./auth_service');

function doTransaction(req){
            
    const body = req.body;
    const headers = req.headers;
    const integrityHeader = headers['x-integrity'];      

    bodyStr = JSON.stringify(body);
    
    const accessToken = headers['authorization'];

    clientId = getClientId(accessToken);
        
    const h = {
        'Content-Type': 'application/json',
        'Origin': headers['origin'],  
        'User-Agent': headers['user-agent'] 
    };

    // Convert the headers object to a string
    const headersString = Object.keys(h)
        .map(key => `${key}: ${h[key]}`)
        .join(', ');
    

    var integrityPayload = headersString+bodyStr+clientId;                    

    console.info('[+] Generating hash value ..')

    const hashValue = generateHash(integrityPayload);
        
    console.info('[+] Hash:')
    console.log(hashValue);

    if(hashValue === integrityHeader){
        console.info('[+] Transaction Successfully Completed')
    } else{
        throw new Error('Wrong Integrity Header!');
    }

}

function generateHash(payload){      

    const hash = CryptoJS.SHA256(payload);
    return hash.toString(CryptoJS.enc.Hex);
}
      

module.exports = {  doTransaction }

