const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res, next) => {
	res.render('index');
});

app.get('/beers', async (req, res) => {
	const beers = await punkAPI.getBeers({ abv_gt: 8 });
	res.render('beers', { beers });
});

app.get('/random-beer', async (req, res) => {
	const [ randomBeer ] = await punkAPI.getRandom();
	console.log(randomBeer.food_pairing[0]);
	res.render('randomBeer', { randomBeer });
});

app.listen(3000, () => console.log(`listen on http://localhost:3000`));
