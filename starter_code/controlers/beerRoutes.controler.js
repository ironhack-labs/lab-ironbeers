const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

const index = (req, res, next) => {
  res.render('index');
}

const beersRoute = async (req, res, next) => {
  try {
    const allBeers = await punkAPI.getBeers();
    res.render('beers-view', { allBeers });
  } catch(error) {
    console.log(error)
  }
}

const randomBeerRoute = async (req, res, next) => {
  try {
    const randomBeer = await punkAPI.getRandom()
    res.render('randomBeer-view', randomBeer[0]);
  } catch(error) {
    console.log(error)
  }
}

punkAPI.getRandom()
.then(beers => {
  console.log(beers)
  res.render('randomBeer', { beers });
})

module.exports = {
  beersRoute,
  randomBeerRoute,
  index,
}