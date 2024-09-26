const express = require('express');

const app = express();

require('./configs/hbs.config')

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`)

app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) => {
  res.locals.currentPath = req.path
  next()
})

//connect routes
const routes = require('./configs/router.config')
app.use('/', routes)
app.use('/beers', routes)

/*
app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    const random = responseFromAPI[0]
    res.render('random-beer', {random})
  })
  .catch(error => console.log(error));
})
*/

app.listen(3000, () => console.info('🏃‍ on port 3000'));
