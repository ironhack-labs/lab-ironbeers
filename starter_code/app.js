
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index');
}); 

/*
app.get("/", (req, res, next)=> {
  res.send(__dirname + "/views/index.hbs", {
    username: "Rodolpho",
    body:"<h1>haloooooo</h1>"
  })
})

*/
app.listen(3000, ()=> {
  console.log("listening in")
})

/*
app.set('views',__dirname + '/views')
app.set('view engine', 'hbs')

app.get("/", (req, res, next)=> {
  res.render(__dirname + "/views/index.hbs", {
    username: "Rodolpho",
    body:"<h1>haloooooo</h1>"
  })
})

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/about.html")
})

app.get("/contact", (req, res) => {
  res.sendFile(__dirname + "/contact.html")
})

app.listen(3000, ()=> {
  console.log("listening in")
})
*/