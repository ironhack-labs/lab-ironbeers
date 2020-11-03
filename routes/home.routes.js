const express = require("express");

const { renderIndex } = require("../controllers/home.controller");

const router = express.Router();

router.get("/", renderIndex);

module.exports = router;