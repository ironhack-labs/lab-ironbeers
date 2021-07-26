const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

const beersRouter = require("./routes/beers")


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + '/views/partials')
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/beers', async (req,res)=>{
  try {
  const beers = await punkAPI.getBeers()
  res.render('beers', {beers});
}
catch(err){ //error appears saying 'try' and 'finally' expected ...?
  console.log(err)
}
});

app.get('/random-beer', (req,res)=> {
  const random = await punkAPI.getRandom()
  try {  
  res.render("rendom-beer", {random})
  }
catch (err){ 
  console.log(err)
}
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
