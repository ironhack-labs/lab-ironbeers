
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

module.exports.home = (req, res, next) => {
  res.render('common/home');
}

module.exports.beers = (req, res, next) => {
 const birras = punkAPI.getBeers()
 birras.then(birra => {
     res.render('common/beers', {
      beers: birra,
           })
   })
 }

module.exports.random = (req, res, next) => {
  const randomBeer = punkAPI.getRandom()
  randomBeer.then(beer => {
    res.render('common/random', {
      randomBeer: beer[0].name,
      tagline: beer[0].tagline,
      image: beer[0].image_url,
      description: beer[0].description,
      food_pairing: beer[0].food_pairing,
      brewers_tips: beer[0].brewers_tips,
    })
  })
}