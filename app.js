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
hbs.registerPartials(path.join(__dirname, 'views/partials'));


// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});


// #### Iteration 3.1 The `/beers` route
app.get('/beers', async (req, res) => {
  punkAPI
  .getBeers()
  .then(beersFromApi => {
    console.log('Beers from the database: ') //beersFromApi);
    res.render('beers', { beersFromApi })
    // res.send("rendering")
  })
  .catch(error => console.log(error));

})


app.get('/random-beer', (req, res) => {
  // res.send('this page is rendering');
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    // 4.1 The /random-beer route
    console.log(responseFromAPI);
    res.render('random-beer', {responseFromAPI})
  })
  .catch(error => console.log(error));
})


app.get('/beers/beer/:id', async (req, res) => {
  //Bonus: Iteration 6
 try{
      const oneBeer = await punkAPI.getBeer(req.params.id);
      console.log("here", oneBeer);
      res.render('detail-beer', {oneBeer})
} catch (err){
  console.log("err")
}
})


app.listen(3000, () => console.log('🏃‍ on port 3000'));
