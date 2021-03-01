const express = require("express");
const router = express.Router();

router.get("/random-beer", (req, res, next) => {
    punkAPI
  .getBeers()
  .then(beersFromApi => console.log('Random beer from the database: ', beersFromApi))
  .catch(error => console.log(error));
  });