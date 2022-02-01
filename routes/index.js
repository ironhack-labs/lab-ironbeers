//importaciones
const express        = require("express")
const router         = express.Router()


//ruteo

router.get("/", (req, res) => {
	res.render("index")
})

router.get("/beers", (req, res) => {
	res.render("beers")
})

router.get("/random-beer", (req, res) => {
	res.render("random-beer")
})

//exportacion

module.exports = router