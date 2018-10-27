![logo_ironhack_blue 7](https://user-images.githubusercontent.com/23629340/40541063-a07a0a8a-601a-11e8-91b5-2f13e4e6b441.png)

# IronBeers


## Introduction

In this lab you will create a web app where the user will be able to see a list of beers or check one randomly. For the exercise, we will work with the [PunkAPI](https://www.npmjs.com/package/punkapi-javascript-wrapper) database, through it's NPM Package. The package has some methods that retrieve beers with some info about them and fits perfect for our example.

## Requirements

- Fork this repo
- Then clone this repo.


## Submission

- Upon completion, run the following commands
```
$ git add .
$ git commit -m "done"
$ git push origin master
```
- Create Pull Request so your TAs can check up your work.

## Instructions


## Iteration 1 - Layout

Our starter code brings the basic configuration to run our server. The `/` route is set to render the `index` file, but first, we need to create our layout.

Inside the `views` folder, create a `layout.hbs` file. Our layout should look like this:

![image](https://user-images.githubusercontent.com/23629340/36723450-8bbcb164-1bb0-11e8-81c3-4fe939730bb9.png)

You will find the `colors` and `fonts` on the `css` file. Remember to add the `{{{ body }}}` and link the `css` file to your **main layout**.

The navbar includes three elements:
- *Home*. ----> Should navigate to `/`.
- *Beers*. ----> Should navigate to `/beers`.
- *Random Beer*. ----> Should navigate to `/random-beers`.

## Iteration 2 - The Index

On the `index.hbs` file you should include the **beer image** you have on the `/public/images`, with two buttons: `Check the Beers!` and `Check a Random Beer`. Both should navigate to the same routes we have on our nav.

![image](https://user-images.githubusercontent.com/23629340/36723774-7d791ef2-1bb1-11e8-991b-39dbf4fd8a59.png)

## Iteration 3 - The Beers Route

Create a `/beers` route inside the `app.js` file. You will also need a `beers.hbs` file to render every time we call this route.

Inside the `/beers` route, call to the `getBeers()` method of our **PunkAPI** package. The package will return you an array of 25 beers, and you should pass that array to the `beers.hbs` view.

```javascript
punkAPI.getBeers()
  .then(beers => {

  })
  .catch(error => {
    console.log(error)
  })
```

Remember you should call the `render` method after getting the `beers` from our package. That means, inside the `then`.

## Iteration 4 - Beers Views

On the `beers.hbs` view, loop over the **beers array** using the `{{#each beers}} {{/each}}` block helper. On every iteration, you should call a `partial` passing the info about each beer.

## Iteration 5 - Beer Partial

Since each beer will be displayed in the same way, you should create a partial to display each beer. First, we need to register where our `partials` will be located. So you need to add the following code to the `app.js` file:

```javascript
hbs.registerPartials(__dirname + '/views/partials')
```

Now, you should create a `partials` folder inside the `views`, and `beerPartial.hbs` file inside the `partials` folder. Our `beerPartial.hbs` will display an image, name, description, and tagline of the beer. It should look like the following:

![image](https://user-images.githubusercontent.com/23629340/36724284-08872254-1bb3-11e8-9ff6-9b34346421ec.png)

After creating the partial, and loop over the array of beers, on our `/bears` route, we should have the following:

![image](https://user-images.githubusercontent.com/23629340/36724392-61fa7336-1bb3-11e8-8468-189908167e10.png)

## Iteration 6 - Random Beer

Finally, let's create our `/random-beer` route. Inside our route you should call the `getRandom()` method of the PunkAPI package and after receiving the info, render the `randomBeer.hbs` file and pass the data of the beer.

```javascript
punkAPI.getRandom()
  .then(beers => {

  })
  .catch(error => {
    console.log(error)
  })
```

On the `randomBeer.hbs` you should print the random beer you get. You should display an image, name, description, tagline, food pairing and brewer tips. It should look like the following:

![image](https://user-images.githubusercontent.com/23629340/36724536-c5924892-1bb3-11e8-8f22-fd1f8ce316af.png)


Happy Coding! :heart:
