// no ponemos extension hbs porque ya lo hemos puesto en motor renderizado de vistas en app.js

module.exports.home = (req, res, next) => {
    res.render('common/home');
  }

   