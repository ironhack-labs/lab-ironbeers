const hbs = require('hbs');
const path = require('path');

hbs.registerPartials(path.join(__dirname, '../views/partials'));

hbs.registerHelper('active', (path, hint) => {
      return path === hint ? 'active': '';
})
