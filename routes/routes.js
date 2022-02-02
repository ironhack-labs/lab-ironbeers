//importaciones
const express = require("express");
const router = express.Router();

const PunkAPIWrapper = require("punkapi-javascript-wrapper")
//rutas

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/beers", async(req, res) => {
    const punkAPI = new PunkAPIWrapper()

	
	const beers	= await punkAPI.getBeers()


  res.render("beers",{data: beers}); 
});

router.get("/random-beer", async (req, res) => {

	const punkAPI = new PunkAPIWrapper()

	const randomBeer 	= await punkAPI.getRandom()
	
	
	res.render("random-beer", {data: randomBeer})
})



//exportaciones
module.exports = router;
