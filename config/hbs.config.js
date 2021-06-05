const hbs = require('hbs');

hbs.registerPartials(`${__dirname}/../views/partials`);

// Helpers
hbs.registerHelper('dotted', (content, length) => {
    return content.length > length ? `${content.substring(0, length)}...` : content;
  })
  
hbs.registerHelper('active', (options) => {
  const { path, match } = options.hash;
  return path === match ? 'active' : '';
})