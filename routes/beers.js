const router = require("express").Router();
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

router.get('/beers', (req, res) => {
    res.render('beers');
})

router.get('/beers', (req, res) => {
    let data = punkAPI.getBeer();
    data.then(beer => {
        res.render('beer', {beer});
    })
    
  });


module.exports = router;
