const express = require('express');

const hbs = require('hbs');
const path = require('path');
const app = express();


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + "/views/partials");

// Register the location for handlebars partials here:

app.use(require("./routes/pages"));

app.listen(3000, () => console.log('🏃‍ on port 3000'));
