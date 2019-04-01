
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PORT=3000;
app.set('view engine','hbs');
app.set('views',__dirname+'/views');
hbs.registerPartials(`${__dirname}/views/partials`);


const PunkAPIWrapper = require('punkapi-javascript-wrapper')
const punkAPI = new PunkAPIWrapper()




app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Home'
  });
});

app.get('/beers',(req, res, next) => {
  punkAPI.getBeers()
    .then( beers => {
      res.render('beers',{
        title: "Beers",
        beers
      })
    })
    .catch(error => console.error(error))
})



app.get('/random-beers',(req, res, next) => {
  punkAPI.getRandom()
    .then( randomBeer => {
      res.render('random-beers', {
        title: randomBeer[0].name,
        randomBeer
      });
    })
    .catch(error => console.error(error))
})


app.listen(PORT, () => console.info(`Application listen at port ${PORT}`));

