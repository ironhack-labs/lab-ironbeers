const hbs = require('hbs')

hbs.registerPartials(`${__dirname}/../views/partials`)

hbs.registerHelper('ellipsis', (text, amount, options) => {
    return `${text.substring(0, Math.min(text.length, amount))}...`
})

hbs.registerHelper('navActive', (path, match) => {
    return (path === match) ? 'active' : ''
})