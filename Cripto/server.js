const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Read key files
const publicKey = fs.readFileSync('public_key.pem', 'utf8');
const privateKey = fs.readFileSync('private_key.pem', 'utf8');

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to get the public key
app.get('/public-key', (req, res) => {
    res.send({ publicKey });
});

// Login route
app.post('/login', (req, res) => {
    const { data } = req.body;

    console.log('[+] Received data:', data);        
  
    // Decrypt the data
    const decrypt = (encryptedText) => {
        const buffer = Buffer.from(encryptedText, 'base64');
        return crypto.privateDecrypt({
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_PADDING,
        }, buffer).toString('utf8');
    };

    try {
        const decryptedData = decrypt(data);        

        console.log('[~] Decrypted data:', decryptedData);        

        // In a real application, you would proceed with authentication here
        res.send('Login successfull');
    } catch (error) {
        console.error('Decryption error:', error);
        res.status(500).send('Decryption failed');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
