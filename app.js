const { response } = require('express');
const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(__dirname + "/views/partials");

// Add the route handlers here:

//iteration 2
app.get('/', (req, res) => {
  res.render('index');
});

//iteration 3
app.get("/beers", async (req, res) => {

  //fetch data of 25 beers
  const listBeers = [];

  const numb = 26;

  for (let i = 1; i < numb; i++) {
    await punkAPI
      .getBeer(i)
      .then(beersFromApi => listBeers.push(beersFromApi[0]))
      .catch(error => console.log(error, i));

  }

  res.render('beers', { listBeers })

})

//iteration 4
app.get("/random-beer", async (req, res) => {
  await punkAPI
    .getRandom()
    .then(responseFromAPI => {
      const randomBeer = responseFromAPI[0]
      res.render("random-beer", { randomBeer });
    })
    .catch(error => console.log(error))

})

//iteration 6
app.get("/beers/beer-:id", async (req, res) => {

  const detail = await punkAPI
    .getBeer(req.params.id)
    .then(responseFromAPI => {
      const randomBeer = responseFromAPI[0]
      res.render("random-beer", { randomBeer });
    })
    .catch(error => console.log(error))

  res.render('detail-beer', { detail })
})


app.listen(3000, () => console.log('🏃‍ on port 3000'));
