const express = require("express");
const router = express.Router();

router.get("/beers", (req, res, next) => {
    punkAPI
  .getBeers()
  .then(beersFromApi => console.log('Beers from the database: ', beersFromApi))
  .catch(error => console.log(error));
  });