// const express = require('express'); 
// const app = express(); 
// app.get("/", (req, res, next) => res.render("index"));

exports.renderIndex = (req, res, next) => {res.render("index")};