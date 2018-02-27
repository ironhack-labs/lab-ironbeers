![Ironhack Logo](https://i.imgur.com/1QgrNNw.png)

# Ironbeers

## Introduction

Best part of fridays? Ironbeers! 

![giphy 5](https://user-images.githubusercontent.com/23629340/36723084-8d27891c-1baf-11e8-9572-f0f2a519bd72.gif)

We will do a web app where the user will be able to see a list of beers or check one randomnly. For the exercise we will working with the [PunkAPI](https://www.npmjs.com/package/punkapi-javascript-wrapper) database, throug it's NPM Package. The package have some methods that retrieve beers with some info about them, and fits perfect for our example.

## Requirements

- [Fork this repo](https://guides.github.com/activities/forking/)
- Clone this repo into your `~/code/labs`

## Submission Instructions

Upon completion, run the following commands
```
$ git add .
$ git commit -m "done"
$ git push origin master
```
Navigate to your repo and create a Pull Request -from your master branch to the original repository master branch.

In the Pull request name, add your name and last names separated by a dash "-"

## Iteration 1 - Layout

Our starter code brings the basic configuration to run our server. The `/` route is set to render the `index` file, but first we need to create our layout.

Inside the `views` folder, create a `layout.hbs` file. Our layout should look like this:

![image](https://user-images.githubusercontent.com/23629340/36723450-8bbcb164-1bb0-11e8-81c3-4fe939730bb9.png)

You will find the `colors` and `fonts` on the `css` file. Remember to add the `{{{ body }}}` and link the `css` file to your **main layout**.

The navbar includes three elements: 
- *Home*. ----> Should navigate to `/`.
- *Beers*. ----> Should navigate to `/beers`.
- *Random Beer*. ----> Should navigate to `/random-beers`.

## Iteration 2 - The Index

On the `index.hbs` file you shoud include the **beer image** you have on the `/public/images`, with two buttons: `Check the Beers!` and `Check a Random Beer`. Both should navigate to the same routes we have on our nav.

![image](https://user-images.githubusercontent.com/23629340/36723774-7d791ef2-1bb1-11e8-991b-39dbf4fd8a59.png)

## Iteration 3 - The Beers Route

Create a `/beers` route inside the `app.js` file. You will need also a `beers.hbs` file to render everytime we call this route.

Insidete the `/beers` route, call to the `getBeers()` method of our **PunkAPI** package. The package will return you an array with 25 beers, and you should pass that array to the `beers.hbs` view.

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

On the `beers.hbs` view, loop over the **beers array** using the `{{#each beers}} {{/each}}` block helper. On every iteration, you should call to a `partial` passing the info about each beer.

## Iteration 5 - Beer Partial

Since, each beer will be displayed on the same way, you should create a partial for display each beer. First we need to register where our `partials` will be located. So you need to add the following code into the `app.js` file:

```javascript
hbs.registerPartials(__dirname + '/views/partials')
```

Now, you should create a `partials` folder inside the `views`, and `beerPartial.hbs` file inside the `partials` folder. Our `beerPartial.hbs` will display an image, name, description and tagline of the beer. It should look like the following:

![image](https://user-images.githubusercontent.com/23629340/36724284-08872254-1bb3-11e8-9ff6-9b34346421ec.png)

After creating the partial, and loop over the array of beers, on our `/bears` route, we should have the following:

![image](https://user-images.githubusercontent.com/23629340/36724392-61fa7336-1bb3-11e8-8468-189908167e10.png)

## Iteration 6 - Random Beer

Finally, let's create our `/random-beer` route. Inside our route you should call to the `getRandom()` method of the PunkAPI package, and after receving the info, render the `randomBeer.hbs` file passing the data of the beer.

```javascript
punkAPI.randomBeer()
  .then(beers => {

  })
  .catch(error => {
    console.log(error)
  })
```

On the `randomBeer.hbs` you should print the random beer you get. You should the display an image, name, description, tagline, food pairing and brewer tips. It should look like the folliwing:

![image](https://user-images.githubusercontent.com/23629340/36724536-c5924892-1bb3-11e8-8f22-fd1f8ce316af.png)

