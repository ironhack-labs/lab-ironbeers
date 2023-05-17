app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then((beersFromApi) => {
      console.log(beersFromApi);
      res.render('beers', { beers: beersFromApi });
    })
    .catch((error) => {
      console.log(error);
      res.render('error', { message: 'Error fetching beers' });
    });
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then((beer) => {
      const [randomBeer] = beer;
      console.log(randomBeer);
      res.render('random-beer', randomBeer);
    })
    .catch((error) => {
      console.log(error);
      res.render('error', { message: 'Error fetching random beer' });
    });
});

app.get('/beers/:beerId', (req, res) => {
  const beerId = req.params.beerId;
  punkAPI
    .getBeer(beerId)
    .then((beer) => {
      const [detailedBeer] = beer;
      console.log(detailedBeer);
      res.render('beer-details', detailedBeer);
    })
    .catch((error) => {
      console.log(error);
      res.render('error', { message: 'Error fetching beer details' });
    });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
