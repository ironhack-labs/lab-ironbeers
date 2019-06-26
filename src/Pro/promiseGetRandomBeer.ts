const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();


/*
* Proceso para obtener random beer
* **/

async function promiseGetRandomBeer(): Promise<object> {


    const p = punkAPI.getRandom()
        .then((lista: object[]) => {
                return lista[0];
            }
        )
        .catch((error: any) => {
                console.log(error);
                throw error;
            }
        )
    ;

    return p;

}


export default promiseGetRandomBeer;
