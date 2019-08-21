document.querySelector('#beer-buttom').onclick = (e) => {
  console.log(e)
  window.location = 'http://localhost:3000/beers'
}

document.querySelector('#random-buttom').onclick = (e) => {
  console.log(e)
  window.location = 'http://localhost:3000/random-beers'
}

//how to use buttons without error on other pages
// how to put footer on the bottom
// how to leave min 100% height