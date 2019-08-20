document.querySelector('#beer-buttom').onclick = (e) => {
  console.log(e)
  window.location = 'http://localhost:3000/beers'
}

document.querySelector('#random-buttom').onclick = (e) => {
  console.log(e)
  window.location = 'http://localhost:3000/random-beers'
}
