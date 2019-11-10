# punkapi-lib [![Build Status](https://travis-ci.org/samjbmason/punkapi-lib.svg?branch=master)](https://travis-ci.org/samjbmason/punkapi-lib) [![Coverage Status](https://coveralls.io/repos/github/samjbmason/punkapi-lib/badge.svg?branch=master)](https://coveralls.io/github/samjbmason/punkapi-lib?branch=master)
> Access the Punk API data and filters locally as a package

## Install
```
$ npm install --save punkapi-lib
```

## Usage
```
const punkapi = require('punkapi-lib')

punkapi.random()
punkapi.beer(1)
punkapi.beers({
  name: 'punk',
  abv_gt: 2
})
...
```

## API
#### `.random()`
Get a random beer
```
punkapi.random()
//=> [{
  id: 14,
  name: "Alpha Dog",
  tagline: "Existential Red Ale.",
  first_brewed: "02/2010",
  description: "A fusion of caramel malt flavours and punchy New Zealand hops. A session beer you can get your teeth into.",
  ...
}]
```

#### `.beer(id:number)`
Get a beer from given id
```
punkapi.beer(1)
//=> [{
  id: 1,
  name: "Buzz",
  tagline: "A Real Bitter Experience.",
  first_brewed: "09/2007",
  description: "A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.",
  abv: 4.5,
  ...
}]
```

#### `.beers(options:object)`
Get beers that match the passed in options, if no options are passed in it will return all beers in ascending order of `id`.

**Options**

##### abv_gt
Type: `number`  
Will return beers with an abv greater than the passed in amount.

##### abv_lt
Type: `number`  
Will return beers with an abv less than the passed in amount.

##### beer_name
Type: `string`  
Will return beers matching the string passed in (we use fuzzy matching to find the names).

##### brewed_before
Type: `string`  
Pattern: `MM-YYYY`  
Will return beers brewed before the passed in date.

##### brewed_after
Type: `string`  
Pattern: `MM-YYYY`  
Will return beers brewed after the passed in date.

##### ebc_gt
Type: `number`   
Will return beers with an ebc greater than the passed in amount.

##### ebc_lt
Type: `number`  
Will return beers with an ebc less than the passed in amount.

##### food
Type: `string`  
Will return beers which match food pairings of the string passed in (we use fuzzy matching to find the foods).

##### hops
Type: `string`  
Will return beers which match the name of the hops of the string passed in (we use fuzzy matching to find the hop names).

##### ibu_gt
Type: `number`  
Will return beers with an ibu greater than the passed in amount.

##### ibu_lt
Type: `number`  
Will return beers with an ibu less than the passed in amount.

##### malt
Type: `string`  
Will return beers which match the name of the malt of the string passed in (we use fuzzy matching to find the malt names).

##### yeast
Type: `string`  
Will return beers which match the name of the yeast of the string passed in (we use fuzzy matching to find the yeast names).

##### ids
Type: `string`  
Pattern: `id|id|id`  
Will return beers which match the given ids, ids should be separated by a pipe symbol.


```
const options = {
  beer_name: 'Punk',
  abv_gt: 5,
  ibu_gt: 30
}

punkapi.beers(options)
//=> [{
  id: 63,
  name: "Sunk Punk",
  tagline: "Ocean Fermented Lager.",
  first_brewed: "09/2011",
  description: "It's rumoured just a drop can calm the fiercest of storms. A balance of sweet, salt and savoury, citrus, spruce and caramel. Fermented at the bottom of the North Sea, which just so happens to be the perfect temperature for lagers to ferment.",
  abv: 7.1,
  ibu: 68,
  ...
},
{
  id: 106,
  name: "Punk IPA 2010 - Current",
  tagline: "Post Modern Classic. Spiky. Tropical. Hoppy.",
  first_brewed: "10/2010",
  description: "Punk IPA. Amplified. In 2010 we finally got our paws on the equipment we needed to dry hop our beers. We focused all our energy on dry hopping, amping up the aroma and flavour of our flagship beer to create a relentless explosion of tropical fruits, and adding a hint of Caramalt to balance out the insane amount of hops.",
  abv: 5.6,
  ibu: 40,
  ...
},
  ...
}]
```

## License
MIT © [Sam Mason](https://masondecair.es)
