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
hbs.registerPartials(`${__dirname}/views/partials`);

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  console.log('Hello from /');
  res.render('index');
});

app.get('/beers', async (req, res, next) => {
   try {
     const Allbeers = await punkAPI.getBeers()
     console.log(Allbeers)

    res.render('beers', {
      Allbeers
    })
  } catch (error) {
    next(error)
  }
})
// .then .catch method :
//       punkAPI
//         .getBeers()
//         .then(beersFromApi => {
//           res.locals.beers = [];
//           beersFromApi.forEach(element => {
//             res.locals.beers.push({
//               id: element.id,
//               image_url: element.image_url,
//               name: element.name,
//               description: element.description,
//               tagline: element.tagline
//             });
//           });
//           console.log(res.locals.beers)
//           res.render('beers',{
//           beers : res.locals.beers,
//           }) ;
//         })
//         .catch(error => {
//           res.statusCode = 500;
//           res.render('server-error', {code: 500, message: error.message});
//         });
// })

app.use((error, req, res, next) => {
  res.statusCode = 500;
  console.log(error.message);
  res.render('server-error', { code: res.statusCode, message: error.message });
});

app.listen(3000, () => console.log('🏃‍ on port 3000 http://localhost:3000'));
