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
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// add the routes here:
app.get('/', (req, res) => {
	res.render('index', {
		title: 'Home'
	});
});


//GET ALL BEERS
app.get('/beers', (req, res) => {
	punkAPI
		.getBeers()
		.then((beersFromApi) => {
			// console.log('Beers from the database: ', beersFromApi);
			res.render('beers', {
				beers: beersFromApi,
			});
		})
		.catch((error) => console.log(error));
});

//GET BEER ID

app.get('/beers/:id', (req, res) => {
	punkAPI
		.getBeer(req.params.id)
		.then((beer) => {
			res.render('beer', beer[0]);
		})

		.catch((error) => console.log(error));
});



//GET RANDOM BEER
app.get('/random-beer', (req, res) => {
	punkAPI
		.getRandom()
		.then((randomBeer) => {
			console.log('Beers from the database: ', randomBeer[0]);
			res.render('random-beer', randomBeer[0]);
		})
		.catch((error) => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));