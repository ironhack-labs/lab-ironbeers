app.use(express.static(path.join(__dirname, 'public')));


hbs.registerPartials(__dirname + '/views/partials');

	app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) =>{
  punkAPI.getBeers()
  .then(beersFromApi => { 
    console.log(beersFromApi)
    res.render('beers', {beers: beersFromApi})
  })
  .catch(error => console.log(error));

});

app.get('/random-beer', (req,res) => {
  punkAPI.getRandom()
  .then((beer)=>{
    const [randomBeer] = beer
    console.log(randomBeer)
    res.render('random-beer', randomBeer);
  })
});

app.get('/beers/:beerId', (req,res)=>{
  punkAPI.getBeer(req.params.beerId)
  .then(beer =>{
    const [detailedBeer] = beer
    console.log(detailedBeer)
    res.render('beer-details', detailedBeer)
  })
  .catch(err=>console.log(err))
})

app.listen(3000, () => console.log('on port 3000'));