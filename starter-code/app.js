const express = require('express');
const hbs = require('hbs');
const path = require('path');


const app = express();


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname + "/views/partials"))

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:

// add the routes here:
app.use("/", require("./routes/beers"));


app.listen(3000, () => console.log('Listning on: http://localhost:3000 🏃‍'));