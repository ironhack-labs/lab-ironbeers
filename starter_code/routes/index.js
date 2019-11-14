// const router = require('express').Router()
const {
  Router
} = require("express");
//  importo cada controller por su nombre, como una propiedad del archivo
const {
  home,
  beers,
  randombeers

} = require("../controllers");


const router = Router();

router.get("/", home);

router.get("/beers", getBeers);

router.get("/randombeers", randombeers);



module.exports = router;