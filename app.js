const express        =   require('express');
const hbs            =   require('hbs');
const path           =   require('path');
const PunkAPIWrapper =   require('punkapi-javascript-wrapper');

const app     = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


hbs.registerPartials(path.join(__dirname, 'views/partials'));
// Add the route handlers here:


app.get('/',              (req, res) =>  res.render('index'));


app.get('/beers', (req, res) =>{
    punkAPI.getBeers()
      .then( beersFromApi => {
        const options = { beersFromApi };
        res.render('beers', options);
      })
      .catch(error => console.log(error))
});


app.get('/random-beers',  (req, res) =>{
    punkAPI.getRandom()
    .then(beer => {
      res.render('random-beers',beer[0]);
    })
    .catch(error =>{
      console.log(error);
    })

});


app.listen(5000);
