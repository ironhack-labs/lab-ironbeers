const express = require('express');
const router = express.Router();
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

router.get('/', (req, res, next) => {
	res.render('index.hbs');
});

router.get('/beers', (req, res) => {
	punkAPI
		.getBeers()
		.then((beersFromApi) => {
			console.log('Beers from the database: ', beersFromApi);
			res.render('beers.hbs', {
				beers: beersFromApi
			});
		})
		.catch((error) => {
			console.log(error);
		});
});

router.get('/random-beer', (req, res) => {
	punkAPI
		.getRandom()
		.then((responseFromAPI) => {
			console.log(responseFromAPI);
			res.render('random-beer.hbs', {
				beer: responseFromAPI
			});
		})
		.catch((error) => {
			console.log(error);
		});
});

module.exports = router;
