module.exports.index = (req, res, next) => {
    res.render('index');
  };

module.exports.beers =  (req, res, next) => {
    res.render('beers');
  };

  module.exports.randombeers = (req, res, next) => {
    res.render('randombeers');
  }; 