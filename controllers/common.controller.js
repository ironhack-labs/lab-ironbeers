
module.exports.home = (req, res, next) => {
    res.render('common/home');
  }
  

module.exports.beers = (req, res, next) => {
    res.render('common/beers');
  }


module.exports.random = (req, res, next) => {
    res.render('common/random');
  }