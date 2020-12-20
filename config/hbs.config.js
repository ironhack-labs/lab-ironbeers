const hbs = require('hbs');
//const moment = require('moment');

 hbs.registerPartials(__dirname + '/../views/partials/');


// Iteration 2: register active helper for nav

hbs.registerHelper('active', (currentPath, hint, options) => {

    return currentPath === hint ? 'active' : '';
    
});


// Iteration 3: register date helper for tweets
