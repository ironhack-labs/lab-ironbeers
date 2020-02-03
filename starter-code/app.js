const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:

// add the routes here:
// index
app.get('/', (req, res) => res.render('index'));

// beers
app.get('/beers', (req, res) => {
	punkAPI
		.getBeers()
		.then((beers) => {
			console.log(beers);
			res.render('beers', { beers });
		})
		.catch((error) => console.log(error));
});

// random beers
app.get('/random-beer', (req, res) => {
	punkAPI
		.getRandom()
		.then((beer) => {
			console.log(beer);
			res.render('random-beer', { beer });
		})
		.catch((error) => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
