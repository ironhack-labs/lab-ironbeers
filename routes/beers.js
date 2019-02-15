var express = require('express');
var router = express.Router();
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

/* GET users listing. */
router.get('/', function (req, res, next) {
  punkAPI.getBeers()
    .then(beers => {
      res.render('beers', {
        beers
      });
    })
    .catch(error => {
      console.log(error)
    })
});
module.exports = router;