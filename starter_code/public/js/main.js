$(document).ready(function() {

  // Add event listeners for the buttons
  $('#btn-beer-list').on('click', ()=>{
    window.location = "/beers";
  });

  $('#btn-random-beer').on('click', ()=>{
    window.location = "/random-beer";
  });

});
