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

hbs.registerPartials(__dirname + '/views/partials');

// add the routes here:

//Rout home:
app.get('/', (req, res) => {
	res.render('index');
});

//Route beers

app.get('/beers', (req, res) => {
	punkAPI
		.getBeers()
		.then(beersFromApi => {
			res.render('beers', {beersFromApi});
		})
		.catch(error => console.log(error));
});

//Route random beers

app.get('/random-beer', (req, res) => {
	punkAPI
		.getRandom()
		.then(responseFromApi => {
			res.render('random-beer', { responseFromApi });
		})
		.catch(error => console.log(error));
});

//Route beer ID

app.get('/beers/:id', (req, res) => {
	punkAPI
		.getBeer(req.params.id)
		.then((beerFromApi) => {
			res.render('beer-id', { beerFromApi });
		})
		.catch(error => console.log(error));
});

//Listen

app.listen(3000, () => console.log('🏃‍ on port 3000'));
