const express = require("express");

const { renderIndex } = require("../controllers/home.controllers");

const router = express.Router();

router.get("/", renderIndex);

module.exports = router;