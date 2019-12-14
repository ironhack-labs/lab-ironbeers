const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/random-beers' , (req,res)=>{
  punkAPI
  .getRandom()
  .then(beers => {
    console.log({chela: beers[0]})
    res.render('random-beers', {chela: beers[0]})
  })
  .catch(error => {
    console.log(error);
  });
})
app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then(chelas => {
    res.render('beers', {chelas});
    // return chelas;
    // let chelasResult = [[]]
    // chelas.forEach((chela, index) => {
    //   console.log(chelasResult[chelasResult.length-1].length < 4)
    //   if(chelasResult[chelasResult.length-1].length < 4){
    //     console.log('primer caso'+chela.length)
    //     chelasResult[chelasResult.length-1].push(chela)
    //   }else{
    //     chelasResult.push([chela])
    //   }
    // })

    console.log(chelasResult.length);
    console.log( '- chelas -', chelasResult )
    res.render('beers', {chelasResult});
  })
  .catch(error => {
    console.log(error);
  });
})

app.listen(3000);

