

const {assert} = require('chai');
const puppeteer = require('puppeteer');
let browser;


// describe('Array', function () {
//    describe('#indexOf()', function () {
//       it('Solo es probar que corren los test', function () {
//          assert(true, "Es para robar que esta funconando testing");
//       });
//    });
// });



before(async () => {
   browser = await puppeteer.launch();
   page = await browser.newPage();
});

after(async () => {
   await browser.close()
});

let listaPage = [
   {urlRel: 'home', nombre: 'Home', htmlBody: ''},
   /*{urlRel: 'beers', nombre: 'Beers', htmlBody: ''},*/
   {urlRel: 'random-beer', nombre: 'Random Beer', htmlBody: ''}
];


const urlSite = 'http://localhost:3006';


let fnTestPage = itemPagina => {

   const urlRel = itemPagina.urlRel;




   describe(`Test Pagina  ${urlRel}`, async () => {

      it('verificar pagina OK ' + urlRel, async () => {

         const urlAbs = urlSite + '/' + urlRel;

         await page.on('response', response => {

            const req = response.request();

            if (req.url() === urlAbs) {
               response.buffer().then(
                   b => {
                      const statusActual = response.status();

                      assert(200 === statusActual, `no devolvió un 200 ${urlRel} - devolvio ${statusActual}`);

                      if (statusActual === 200) {
                         const promise = response.text();
                         promise.then(
                             (body) => {
                                itemPagina.htmlBody = body;
                             },
                             (error) => {
                                console.log(error);
                             }
                         );
                      }

                   },
                   e => {
                      assert(false, `${urlRel} - error fatal ${response.url()} , ${e}`);
                   }
               );
            }


         });




         await page.goto(urlAbs, {waitUntil: 'networkidle2'});

         await page.screenshot({path: 'test/screen/' + urlRel + '.png'});


         /* -------------------------------------------- */
         // const functionToInject = function(){
         //    return window.isPageLoaded;
         // };
         //
         // let isPageLoaded = await page.evaluate(functionToInject);
         // assert(isPageLoaded,'No se ejecutó todo el javascript - isPageLoaded');

         /* -------------------------------------------- */



         //Verificar que existe el elemento del main menu

         const htmlMainMenu = `id="mainMenu"`;
         let index = itemPagina.htmlBody.indexOf(htmlMainMenu);
         assert(index > 0, `No aparece el "mainMenu" ${urlRel} en ${itemPagina.nombre}`);



      }).timeout(20000)
   });
};


listaPage.forEach(itemPagina => {

   fnTestPage(itemPagina);
});



