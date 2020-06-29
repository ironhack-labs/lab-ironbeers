const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const punkAPI = new PunkAPIWrapper();

module.exports = async function getBeers() {
  try {
    const results = await punkAPI.getBeers();
    return results;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
