const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');

// punki api call
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

// template stuff and static assets
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static(path.join(__dirname, 'public')));

// handlebar helper to move in helper.js
hbs.registerHelper('truncate', function (str, len) {
	if (str.length > len && str.length > 0) {
		var new_str = str + " ";
		new_str = str.substr(0, len);
		new_str = str.substr(0, new_str.lastIndexOf(" "));
		new_str = (new_str.length > 0) ? new_str : str.substr(0, len);

		return new hbs.SafeString(new_str + '...');
	}
	return str;
});

// routes
app.get('/', (req, res, next) => {
	res.render('index');
});

// get punk beers list inside beers view
app.get("/beers", (request, response, next) => {
	punkAPI.getBeers()
		.then(beers => {
			response.render("beers.hbs", {
				beers
			});
		})
		.catch(error => {
			console.log(error);
		});
});

// a single random beer view
app.get("/random-beer", (request, response, next) => {
	punkAPI.getRandom()
		.then(beers => {
			response.render("random_beer.hbs", {
				beers
			});
		})
		.catch(error => {
			console.log(error);
		});
});



app.listen(3000);