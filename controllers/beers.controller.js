const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

module.exports.list = (req, res) => {
	punkAPI
		.getBeers()
		.then(beersFromApi => {
			res.render('beers/list', { beers: beersFromApi })
		})
		.catch(error => console.log(error))
};

module.exports.randomDetail = (req, res) => {
	punkAPI
		.getRandom()
		.then(randomBeersFromApi => {
			console.log('Beers from the database: ', randomBeersFromApi)
			res.render('beers/random-beer', {
				beer: randomBeersFromApi[0]
			})
		})
		.catch(error => console.log(error))
}

module.exports.detail = (req, res) => {
	punkAPI
		.getBeer(req.params.id)
		.then(beerDetail => {
			res.render('beers/detail', {
				beer: beerDetail[0]
			})
		})
		.catch(error => console.log(error))
}
