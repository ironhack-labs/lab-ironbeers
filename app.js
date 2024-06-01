const express = require('express');
const axios = require('axios');
const hbs = require('hbs');
const path = require('path');
const app = express();
const port = 3000;

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  axios
    .get('https://api.openbrewerydb.org/v1/breweries?per_page=10')
    .then(response => {
      let data = response.data;
      data.forEach(brewery => {
        delete brewery.phone;
        delete brewery.website_url;
      });
      res.render('beers', { beers: data });
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  axios
    .get('https://api.openbrewerydb.org/v1/breweries/random')
    .then(response => {
      let data = response.data[0];
      res.render('beer', data);
    })
    .catch(error => console.log(error));
});

app.get('/beers/beer-:id', (req, res) => {
  axios
    .get(`https://api.openbrewerydb.org/v1/breweries/${req.params.id}`)
    .then(response => {
      let data = response.data;
      res.render('beer', data);
    })
    .catch(error => console.log(error));
});

app.listen(port, () => console.log(`🏃‍ on port ${port}`));
