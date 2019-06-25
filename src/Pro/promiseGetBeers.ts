const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();


let listaBeers: object[];

/*
* Proceso para obtener las lista de beers del serviciio, se utiliza cache para solo hacer el primer
* request y posteriormente se utilzia el cache
* **/

async function promiseGetBeers(): Promise<object[]> {

   let p: Promise<object[]>;
   if (listaBeers) {

      p = Promise.resolve(listaBeers);


   } else {

      //obtener la lista y crear cache
      p = punkAPI.getBeers()
          .then((beers: any) => {
                 listaBeers = beers;
                 return listaBeers;
              }
          )
          .catch((error: any) => {
                 console.log(error);
                 throw error;
              }
          );

   }

   return p;

}


export default promiseGetBeers;
