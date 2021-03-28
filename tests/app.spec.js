const app = require('./../app');
const request = require('supertest');
const cheerio = require('cheerio');

beforeAll(() => {
  process.env.NODE_ENV = 'test';
});

describe('Homepage', () => {
  let response;
  let $;

  beforeAll(async () => {
    response = await request(app).get('/');
    $ = cheerio.load(response.text);
  });

  test('should load', () => {
    expect(response.status).toBe(200);
  });

  test('should have navbar with links', () => {
    const paths = [];
    $('a').each((i, anchor) => paths.push($(anchor).attr('href')));
    for (let path of ['/', '/beers', '/random-beer'])
      expect(paths.includes(path)).toBe(true);
  });

  test('should have image of beer', () => {
    const image = $('img');
    expect(image.attr('src')).toBe('/images/beer.png');
  });
});

describe('Beers', () => {
  let response;
  let $ = cheerio.load('');

  beforeAll(async () => {
    response = await request(app).get('/beers');
    $ = cheerio.load(response.text);
  });

  test('should load', () => {
    expect(response.status).toBe(200);
  });

  test('should multiple beers', () => {
    $ = cheerio.load(response.text);
    const beers = $('.beer');
    expect(beers.length > 0).toBe(true);
    beers.each((i, element) => {
      const beer = $(element);
      expect(beer.find('img').attr('src').includes('.png')).toBe(true);
    });
  });
});
