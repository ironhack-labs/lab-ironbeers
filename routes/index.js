//importaciones
const express        = require("express")
const router         = express.Router()


//ruteo

router.get("/", (req, res) => {
	res.render("index")
})

//exportacion

module.exports = router