
const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

// Middleware
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, 'views', 'partials'))

// Routes
app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {

  // punkAPI.getBeers()
  //   .then(beers => {
  //     console.log(beers);
  //     res.render('beers', beers)
  //   })
  //   .catch(error => {
  //     console.log(error)
  //   })

  // Couldn't get this to work, response from API was:
  // { statusCode: 429,
  //   error: 'Too Many Requests',
  //   message:
  //    'You have reached your limit on this ip address please wait an hour' }

  let beers = [
    {
      name: "Guiness",
      description: "Mmm this is one delicious beer",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fe/Guinness-original-logo.svg/1200px-Guinness-original-logo.svg.png"
    },
    {
      name: "Heineken",
      description: "Tasty tasty beer",
      image: "https://pbs.twimg.com/profile_images/737187615397543936/MhILfNK__400x400.jpg"
    },
    {
      name: "Tuborg",
      description: "The best lager in the world",
      image: "https://www.brewcrew.ie/wp-content/uploads/2016/06/tuborg.jpg"
    }
  ]

  res.render('beers', { beers });
});

app.get('/random-beers', (req, res, next) => {

  let beer = {
    name: "Guiness",
    description: "Mmm this is one delicious beer",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fe/Guinness-original-logo.svg/1200px-Guinness-original-logo.svg.png"
  }

  res.render('random-beers', beer);
})

// Start listening
app.listen(3000);