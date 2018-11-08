
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials')

app.listen(3000);

// #####################################################

app.get('/', (req, res, next) => {
	res.render('index.hbs');
});

app.get('/beers', (req, res, next) => {

	const beers = punkAPI.getBeers()
  		beers.then(beers => {
  			res.locals.beerList = beers;
  			res.render('beers.hbs');
  	});

	beers.catch(error => {
		console.log(error);
  	});
});

app.get('/random-beer', (req, res, next) => {
	const randomBeer = punkAPI.getRandom();
		randomBeer.then(randomBeer => {
			res.locals.rdmBeer = randomBeer[0];
			res.render('random.hbs');
		});

		randomBeer.catch(error => {
			console.log(error);
		});
});




