const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname+"/views/partials")

// add the partials here:

// add the routes here:
app.get('/', (req, res) => res.render('index'));
app.get('/beer', (req, res) => {

    punkAPI.getBeers()
        .then(beersFromAPI => {  res.render('beer', {beersFromAPI}) })

});
app.get('/beer/:id', (req, res) => {


    punkAPI.getBeer(req.params.id)
        .then(responseFromAPI => {  res.render('randombeers', responseFromAPI[0]) })

});
app.get('/random-beer', (req, res) => {
    punkAPI.getRandom()
        .then(responseFromAPI => res.render('randombeers', responseFromAPI[0] )
        )
        .catch(error => console.log(error));

});

 

app.listen(3000, () => console.log('🏃‍ on port 3000'));
