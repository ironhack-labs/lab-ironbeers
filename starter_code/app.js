
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials');


app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    console.log(JSON.stringify(beers.name));
    res.render('beers', {beers});
  })
  .catch(error => {
    console.log("result error " + error);
  })

  
});

app.get('/randomBeers', (req, res, next) => {
  punkAPI.getRandom()
  .then(beerx => {
    console.log("name: " + JSON.stringify( beerx[0].name));

    console.log("image: " + JSON.stringify( beerx[0].image_url));
    let description = beerx[0]
    res.render('randomBeers', description);
  })
  .catch(error => {
    console.log(error)
  })
  
});

app.listen(3000);

// [
//   {
//     "id": 4,
//     "name": "Pilsen Lager",
//     "tagline": "Unleash the Yeast Series.",
//     "first_brewed": "09/2013",
//     "description": "Our Unleash the Yeast series was an epic experiment into the differences in aroma and flavour provided by switching up your yeast. We brewed up a wort with a light caramel note and some toasty biscuit flavour, and hopped it with Amarillo and Centennial for a citrusy bitterness. Everything else is down to the yeast. Pilsner yeast ferments with no fruity esters or spicy phenols, although it can add a hint of butterscotch.",
//     "image_url": "https://images.punkapi.com/v2/4.png",
//     "abv": 6.3,
//     "ibu": 55,
//     "target_fg": 1012,
//     "target_og": 1060,
//     "ebc": 30,
//     "srm": 15,
//     "ph": 4.4,
//     "attenuation_level": 80,
//     "volume": {
//       "value": 20,
//       "unit": "litres"
//     },
//     "boil_volume": {
//       "value": 25,
//       "unit": "litres"
//     },
//     "method": {
//       "mash_temp": [
//         {
//           "temp": {
//             "value": 65,
//             "unit": "celsius"
//           },
//           "duration": null
//         }
//       ],
//       "fermentation": {
//         "temp": {
//           "value": 9,
//           "unit": "celsius"
//         }
//       },
//       "twist": null
//     },
//     "ingredients": {
//       "malt": [
//         {
//           "name": "Extra Pale",
//           "amount": {
//             "value": 4.58,
//             "unit": "kilograms"
//           }
//         },
//         {
//           "name": "Caramalt",
//           "amount": {
//             "value": 0.25,
//             "unit": "kilograms"
//           }
//         },
//         {
//           "name": "Dark Crystal",
//           "amount": {
//             "value": 0.06,
//             "unit": "kilograms"
//           }
//         },
//         {
//           "name": "Munich",
//           "amount": {
//             "value": 0.25,
//             "unit": "kilograms"
//           }
//         }
//       ],
//       "hops": [
//         {
//           "name": "Centennial",
//           "amount": {
//             "value": 5,
//             "unit": "grams"
//           },
//           "add": "start",
//           "attribute": "bitter"
//         },
//         {
//           "name": "Amarillo",
//           "amount": {
//             "value": 5,
//             "unit": "grams"
//           },
//           "add": "start",
//           "attribute": "bitter"
//         },
//         {
//           "name": "Centennial",
//           "amount": {
//             "value": 10,
//             "unit": "grams"
//           },
//           "add": "middle",
//           "attribute": "flavour"
//         },
//         {
//           "name": "Amarillo",
//           "amount": {
//             "value": 10,
//             "unit": "grams"
//           },
//           "add": "middle",
//           "attribute": "flavour"
//         },
//         {
//           "name": "Centennial",
//           "amount": {
//             "value": 17.5,
//             "unit": "grams"
//           },
//           "add": "end",
//           "attribute": "flavour"
//         },
//         {
//           "name": "Amarillo",
//           "amount": {
//             "value": 17.5,
//             "unit": "grams"
//           },
//           "add": "end",
//           "attribute": "flavour"
//         }
//       ],
//       "yeast": "Wyeast 2007 - Pilsen Lager™"
//     },
//     "food_pairing": [
//       "Spicy crab cakes",
//       "Spicy cucumber and carrot Thai salad",
//       "Sweet filled dumplings"
//     ],
//     "brewers_tips": "Play around with the fermentation temperature to get the best flavour profile from the individual yeasts.",
//     "contributed_by": "Ali Skinner <AliSkinner>"
//   }
// ]

/////////////////
// {
//   "id": 1,
//   "name": "Buzz",
//   "tagline": "A Real Bitter Experience.",
//   "first_brewed": "09/2007",
//   "description": "A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.",
//   "image_url": "https://images.punkapi.com/v2/keg.png",
//   "abv": 4.5,
//   "ibu": 60,
//   "target_fg": 1010,
//   "target_og": 1044,
//   "ebc": 20,
//   "srm": 10,
//   "ph": 4.4,
//   "attenuation_level": 75,
//   "volume": {
//     "value": 20,
//     "unit": "litres"
//   },
//   "boil_volume": {
//     "value": 25,
//     "unit": "litres"
//   },
//   "method": {
//     "mash_temp": [
//       {
//         "temp": {
//           "value": 64,
//           "unit": "celsius"
//         },
//         "duration": 75
//       }
//     ],
//     "fermentation": {
//       "temp": {
//         "value": 19,
//         "unit": "celsius"
//       }
//     },
//     "twist": null
//   },
//   "ingredients": {
//     "malt": [
//       {
//         "name": "Maris Otter Extra Pale",
//         "amount": {
//           "value": 3.3,
//           "unit": "kilograms"
//         }
//       },
//       {
//         "name": "Caramalt",
//         "amount": {
//           "value": 0.2,
//           "unit": "kilograms"
//         }
//       },
//       {
//         "name": "Munich",
//         "amount": {
//           "value": 0.4,
//           "unit": "kilograms"
//         }
//       }
//     ],
//     "hops": [
//       {
//         "name": "Fuggles",
//         "amount": {
//           "value": 25,
//           "unit": "grams"
//         },
//         "add": "start",
//         "attribute": "bitter"
//       },
//       {
//         "name": "First Gold",
//         "amount": {
//           "value": 25,
//           "unit": "grams"
//         },
//         "add": "start",
//         "attribute": "bitter"
//       },
//       {
//         "name": "Fuggles",
//         "amount": {
//           "value": 37.5,
//           "unit": "grams"
//         },
//         "add": "middle",
//         "attribute": "flavour"
//       },
//       {
//         "name": "First Gold",
//         "amount": {
//           "value": 37.5,
//           "unit": "grams"
//         },
//         "add": "middle",
//         "attribute": "flavour"
//       },
//       {
//         "name": "Cascade",
//         "amount": {
//           "value": 37.5,
//           "unit": "grams"
//         },
//         "add": "end",
//         "attribute": "flavour"
//       }
//     ],
//     "yeast": "Wyeast 1056 - American Ale™"
//   },
//   "food_pairing": [
//     "Spicy chicken tikka masala",
//     "Grilled chicken quesadilla",
//     "Caramel toffee cake"
//   ],
//   "brewers_tips": "The earthy and floral aromas from the hops can be overpowering. Drop a little Cascade in at the end of the boil to lift the profile with a bit of citrus.",
//   "contributed_by": "Sam Mason <samjbmason>"
// }