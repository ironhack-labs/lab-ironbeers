// cajon de acciones about, home... info

module.exports.home = (req, res, next) => {
    res.render('common/home');
};

const beersArr = require('../data/beers');

module.exports.beers = (req, res, next) => {
        res.render('common/beers', {
        beers: beersArr
    });
};

module.exports.randomBeer = (req, res, next) => {
    let randomBeer = beersArr[Math.floor(Math.random() * beersArr.length)]
    res.render('common/random-beer', {
        randomBeer: randomBeer
    });
    
};


