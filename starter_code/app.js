
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res, next) => {
  res.render('index');
});



// app.get('/aha',(req,res,next)=>{
//   res.render('sample')
// }
// )

hbs.registerPartials(__dirname + '/views/partials')


app.get('/beers', (req, res, next) => {
  punkAPI.getBeers().then(beer=> {
     console.log(beer)
      res.render('beerPartial', {beer});
    // console.log("hello")
  })
  .catch(error =>{
    console.log(error)
  })
  });


  app.get('/random-beers', (req, res, next)=> {
    punkAPI.getRandom().then(beer => {
    res.render('randomBeer', {beer});
  })
   .catch(error => {
    console.log(error)
   })
  })
  //   app.get('views/partial',(req,res,next)=>{
  //     hbs.registerPartials(__dirname + '/views/partials')
  //     punkAPI.getBeers().then(beer=> {
  //   res.render('beerPartial', {beer});
  // })
  //   })






app.listen(3000);
