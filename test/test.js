

const {assert} = require('chai');
const puppeteer = require('puppeteer');
let browser;


describe('Array', function () {
   describe('#indexOf()', function () {
      it('Solo es probar que corren los test', function () {
         assert(true, "Es para robar que esta funconando testing");
      });
   });
});


/*
before(async () => {
   browser = await puppeteer.launch();
   page = await browser.newPage();
});

after(async () => {
   await browser.close()
});

let listaPage = [
   {urlRel: 'index.html', nombre: 'Home', htmlBody: ''},
   {urlRel: 'about.html', nombre: 'About', htmlBody: ''},
   {urlRel: 'fotos.html', nombre: 'Fotos', htmlBody: ''},
];


const urlSite = 'http://localhost:3005';


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

                      assert(200 === statusActual, `no devolvio un 200 ${urlRel} - devolvio ${statusActual}`);

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

         //Verificar el contenido del html


         listaPage.forEach(item => {
            const htmlLink = `<a class="nav-link" href="${item.urlRel}">${item.nombre}</a>`;
            let index = itemPagina.htmlBody.indexOf(htmlLink);

            assert(index > 0, `No aparece el link ${item.urlRel} en ${itemPagina.nombre}`);
         });


      }).timeout(6000)
   });
};


listaPage.forEach(itemPagina => {

   fnTestPage(itemPagina);
});


*/
