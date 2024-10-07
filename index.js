require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// app.use(cors());
app.use(express.json())

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});


const urlDatabase= {};
let idCounter=1;

const generateShortcode =()=>{
  return (idCounter++).toString(36);
}
app.use(express.json());


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

app.get('/shorten',(req,res)=>{
  const {originalUrl}= req.body;
  if(!originalUrl){
    return res.status(400).json({error:'url not provided'});
  }

  const shortCode = generateShortcode();
  urlDatabase[shortCode] = originalUrl;

  res.json({
    originalUrl,shortUrl:`http://localhost:${port}/${shortCode}`,
  })
})

