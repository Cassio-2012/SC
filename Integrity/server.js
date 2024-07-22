const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const { loginUser } = require('./auth_service');

const { doTransaction } = require('./bank_service');

const app = express();
const port = 3000;


// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve different HTML files based on the path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const fingerPrint = req.headers['x-fingerprint'];                     
  
    try {                                
        accessToken = loginUser(username, password, fingerPrint);

        res.status(200).send(JSON.stringify({accessToken: accessToken}));
    } catch (error) {
        console.error('error:', error);
        res.status(500).send('Login failed');
    }
});

app.post('/transfer', (req, res) => {                    
  
    try {     

        doTransaction(req);
        res.status(200).send('Success');
        
    } catch (error) {
        console.error('error:', error);
        res.status(500).send('Transfer Failed');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
