const express = require('express');
const router  = express.Router();
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

  router.get("/", (req, res) => {
    punkAPI
    .getRandom()
    .then(dbRes => {
          console.log(dbRes)
        res.render("beers", { beers: dbRes });
      })
      .catch(err => console.log(err));
  });


  module.exports = router;