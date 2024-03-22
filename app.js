const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

const axios = require('axios').default;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:
fetch('https://dummyjson.com/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'kminchelle',
    password: '0lelplR'
  })
})
  .then(res => res.json() && console.log('auth worked'))
  .catch(error => console.log('error') && console.log('auth error'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  const itemList = axios.get('https://dummyjson.com/products');
  let productData;
  let itemNames = [];
  itemList
    .then(item => {
      const { data, ...rest } = item;
      productData = data.products;
      return productData;
    })
    .then(() => {
      for(let i=0; i<25; i++) {
        itemNames.push(productData[i]);
      };
      return console.log(itemNames);
    } )
    .then(() => res.render('beers', {itemNames}))
    .catch(error => console.log('error') && console.log(error));
});

app.get('/random-beer', (req, res) => {
  const itemList = axios.get('https://dummyjson.com/products');
  let productData;
  let randomItem;
  let randomPosition;
  itemList
  .then(item => {
    const { data, ...rest } = item;
    productData = data.products;
    return productData;
  })
  .then((productData) => {
    randomPosition = Math.floor(Math.random()*productData.length);
    randomItem = productData[randomPosition];
    return randomItem;
  })
  .then((randomItem) => res.render('randomBeer',{randomItem}))
  .catch(error => console.log('error') && console.log(error));
});

function getProductDetails(productData,itemId) {
  const product = productData.findOne({ id: itemId });
  return product;
};

app.get('/beer-detail-page', (req, res) => {
  const itemId = req.query.id;
  const itemList = axios.get('https://dummyjson.com/products');
  let productData;
  itemList
  .then(item => {
    const { data, ...rest } = item;
    productData = data.products;
    return productData;
  })
  .then((productData) => {
    beerDetailPage = getProductDetails(productData,itemId);
    return beerDetailPage;
  })
  .then((beerDetailPage) => res.render('beerDetailPage',{beerDetailPage}))
  .catch(error => console.log('error') && console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
