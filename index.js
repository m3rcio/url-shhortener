require('dotenv').config();
const express = require('express');
const app = express();
// const crypto= require('crypto')
const mongoose= require('mongoose')
const ShortUrl= require('./shortUrl')
const shortid=require('shortid')
const port = process.env.PORT || 3000;
mongoose.connect('mongodb://127.0.0.1:27017/urlShortener')
// app.use(cors());
app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
// app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', async (req, res) =>{
  const shortUrls=await ShortUrl.find()
  res.render('index',{shortUrls:shortUrls})
});


app.use(express.json());


app.post('/shortUrls', async (req, res) => {  
  const short = shortid.generate(); 
  await ShortUrl.create({ full: req.body.fullUrl, short: short });
  // res.redirect('/')
  res.json({
    short: short
  })
});

app.get('/:shortUrl',async (req,res)=>{
  const shortUrl= await ShortUrl.findOne({
    short:req.params.shortUrl
  })
  if(shortUrl==null) return res.sendStatus(404)

  shortUrl.clicks++
  res.redirect(shortUrl.full)
})

app.listen(port, () => {
  console.log(`URL shortener listening at http://localhost:${port}`);
});