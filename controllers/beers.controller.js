module.exports.beer = (req, res) => {
  res.render("beers", {});
};


// const Beer = require("../models/beer.model");

// module.exports.list = (req, res) => {
//   Beer.find()
//     .then((beers) => {
//       res.render("beers/list", { beers });
//     })
//     .catch((err) => {
//       // TODO
//     });
// };

// module.exports.detail = (req, res) => {
//   Beer.findById(req.params.id)
//     .then((beer) => {
//       if (beer) {
//         res.render("beers/detail", { beer });
//       } else {
//         req.redirect("/beers");
//       }
//     })
//     .catch((err) => {});
// };

// module.exports.create = (req, res) => {
//   // TODO
// };

// module.exports.doCreate = (req, res) => {
//   // TODO
// };

// module.exports.edit = (req, res) => {
//   // TODO
// };

// module.exports.doEdit = (req, res) => {
//   // TODO
// };

// module.exports.delete = (req, res) => {
//   // TODO
// };
