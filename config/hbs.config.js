const hbs = require('hbs');
hbs.registerPartials(__dirname + '/../views/partials/');
hbs.registerHelper('active', (currentPath, hint, options) => {
    return currentPath === hint ? 'active' : '';
});


