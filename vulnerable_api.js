const express = require('express')
const {signup, getUser, isAuthorized} = require('./service');
const {login} = require('./authService');
const axios = require('axios');
const url = require('url');

const app = express();
app.use(express.json());

// // ----------------- RATE LIMIT -------------------------------------
// const rateLimit = require('express-rate-limit');

// // rate limit middleware config
// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 10, // Limit each IP to 100 requests per windowMs
//     message: 'Too many requests from this IP, please try again later.',
// });

// app.use(limiter);


// ------------------------ SSRF -----------------------------

// const allowedDomains = ['example.com', 'api.example.com', 'www.google.com']; // Domínios permitidos

// function isAllowedUrl(requestedUrl) {
//     try {
//       const parsedUrl = new url.URL(requestedUrl);      
//       return allowedDomains.includes(parsedUrl.hostname);
//     } catch (error) {
//       console.log(error)
//       return false;
//     }
// } 

const port = 3000;

app.get('/', (req, res) =>{
    res.json({message:'ok'});
})

app.post('/signup', (req, res) =>{    
    res.json(signup(req.body));
})


app.post('/signin', (req, res) =>{
    res.json(login(req.body));
})

app.get('/users/:userId', (req, res) =>{
    const authHeader = req.headers['authorization'];
    const userId = req.params.userId;   
    
    res.json(getUser(userId, authHeader));            
})


//Cadastro de webhook
app.post('/webhook', async (req, res) => {
    const { url } = req.body;

    if (!isAllowedUrl(url)) {
        return res.status(400).send('Invalid URL');
    }
  
    try {
      // Faz uma requisição HTTP para a URL fornecida pelo usuário
      const response = await axios.get(url);

      if(response.status == 200){
        return res.send({message:'webhook cadastrado'});  
      }

      return res.status(400).send('webhook url is not reachable');

    } catch (error) {
      console.error(error)
      return res.status(500).send('Error fetching data');
    }
  })

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});