const express = require('express');

const hbs = require('hbs');
const path = require('path');

const app = express();


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/pokemon', (req, res) => {
  fetch("https://pokeapi.co/api/v2/pokemon/")
    .then(response => response.json())
    .then(data => {
      res.render("pokemon", { pokemonData: data });
    })
    .catch(error => {
      console.error('Error fetching Pokemon data:', error);
      res.status(500).send('Error fetching Pokemon data');
    });
});
app.get('/randomPokemon', (req, res) => {
  fetch("https://pokeapi.co/api/v2/pokemon/")
    .then(response => response.json())
    .then(data => {
      
      const randomPokemonIndex = Math.floor(Math.random() * data.results.length);
      const randomPokemonUrl = data.results[randomPokemonIndex].url;
      
    
      return fetch(randomPokemonUrl);
    })
    .then(response => response.json())
    .then(randomPokemonData => {
     
      const pokemonName = randomPokemonData.name;
      const abilities = randomPokemonData.abilities.slice(0, 2).map(ability => ability.ability.name);
      
    
      res.render("randomPokemon", { name: pokemonName, abilities: abilities });
    })
    .catch(error => {
      console.error('Error fetching random Pokémon:', error);
      res.status(500).send('Error fetching random Pokémon');
    });
});
;

