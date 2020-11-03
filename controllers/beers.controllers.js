exports.renderBeers = (req, res) => {
    const beers = punkAPI.getBeers()
    .then(beersFromApi => console.log('Beers from the database: ', beersFromApi))
    .catch(error => console.log(error));
    res.render("beers", { beers });
}
