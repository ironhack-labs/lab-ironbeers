const hbs = require('hbs');
const path = require('path');

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, '../views/partials'));

// Helpers
hbs.registerHelper('dotted', (content, length) => {
  return content.length > length ? `${content.substring(0, length)}...` : content;
})
