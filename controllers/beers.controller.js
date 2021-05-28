const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

module.exports.list = (req, res, next) => {
  res.render('beers/list');
}
