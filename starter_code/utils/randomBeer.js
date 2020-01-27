const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

const randomBeer = ( cb ) => {
    
    punkAPI.getRandom()
        .then( (beer) => {
            const result = {
                name: beer[0].name, 
                tagline: beer[0].tagline, 
                description: beer[0].description,
                image_url: beer[0].image_url
            };
            return cb( undefined, result );
        })
        .catch( err => cb( err, undefined ));
}

module.exports = randomBeer;