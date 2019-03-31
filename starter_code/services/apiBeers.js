const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

module.exports = {

    getBeers: punkAPI.getBeers().then(beers => {
        return beers
        }).catch(error => {
            console.log(error)
        }),
   
    getRandom: punkAPI.getRandom().then(beers => {
        return beers
    }).catch(error => {
      console.log(error)
    })
    
}