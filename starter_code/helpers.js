var Handlebars  = require('hbs');
var library     = require('@fortawesome/fontawesome-svg-core').library;
var dom         = require('@fortawesome/fontawesome-svg-core').dom;
var icon        = require('@fortawesome/fontawesome-svg-core').icon;
var fas         = require('@fortawesome/free-solid-svg-icons').fas;

// Adds all the icons from the Solid style into our library for easy lookup
library.add(fas)

Handlebars.registerHelper('fontawesome-css', function () {
  return new Handlebars.SafeString(
    dom.css()
  )
})

Handlebars.registerHelper('fontawesome-icon', function (args) {
  return new Handlebars.SafeString(
    icon({ prefix: 'fas', iconName: args.hash.icon }).html
  )
})