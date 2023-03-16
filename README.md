![logo_ironhack_blue 7](https://user-images.githubusercontent.com/23629340/40541063-a07a0a8a-601a-11e8-91b5-2f13e4e6b441.png)

# LAB | Express IronBeers

## Introduction

Sometimes you would just like to have a very descriptive list of all beers so you could see their type, color, each beer's percentage of alcohol, or which beer is well pared with some food. In this lab, you will create a web app where the user will be able to see a list of beers, get random suggestions, and read a very descriptive explanation of each beer.

"How will we get all of this information?", you might ask. Well, we will be using an npm package :package: as our data source.

For this exercise, we will work with the **[PunkAPI](https://www.npmjs.com/package/punkapi-javascript-wrapper)** npm package. In the background, the package communicates with a remote _database_ that contains all of the beers. The package enables us to use its methods that can help us to retrieve beers. Each beer has some properties, and we can play around with this data to practice working with Handlebars templates, `layouts` and `partials`.

**In this lab, we can also practice reading external (PunkAPI) docs and learn how to get what we need from the database.**

## Requirements

- Fork this repo
- Then clone this repo.

## Submission

- Upon completion, run the following commands:

```shell
$ git add .
$ git commit -m "done"
$ git push origin master
```

- Create Pull Request so your TAs can check up your work.

## Instructions

### Iteration 0: Initial setup

To run our application, the first thing you have to do is to install all of its dependencies. Run the following command:

```shell
$ npm install
```

To run the app:

```shell
$ nodemon app.js

# you can also run: npm run dev
```

### Iteration 1: Layout barebones

Our starter code includes the basic configuration needed to run our app. The **`/`** route is set to render the `index.hbs` file. Let's start by creating a layout.

Inside the `views` folder, create a `layout.hbs` file. In the bonus iteration, you can give your app some style, but for now, let's focus on the logic.

Remember to add the `{{{ body }}}` to the **main layout**.

Add a navbar that includes links to 3 pages:

- _Home_ ==> should navigate to `/`.
- _Beers_ ==> should navigate to `/beers`.
- _Random Beer_ ==> should navigate to `/random-beer`.

The layout is done, let's move to create these three pages.

### Iteration 2 - Home _page_

- The first page should be **Home** and should be rendered on **`/`**. The file that gets rendered is `index.hbs`.
- This file should include the _beer image_, which you can find at `/public/images`. Together with the image, `index.hbs` should have two links: `Check the Beers!` and `Check a Random Beer`. Both links should navigate to the corresponding routes (which we previously defined in our navbar as well). Later, you can style these `a` tags to make them look like buttons.

![image](https://user-images.githubusercontent.com/23629340/36723774-7d791ef2-1bb1-11e8-991b-39dbf4fd8a59.png)

### Iteration 3 - Beers _page_

The next thing we will be working on is a page where we can present all the beers we will retrieve from the remote database. This page will be rendered every time the user visits the `/beers` route.

This leads us to the conclusion that in this step, we have two main focus areas:

- the `/beers` route and
- the `beers.hbs` view.

#### Iteration 3.1 The `/beers` route

In this step, we will have a couple of micro-steps:

- Create a `/beers` route inside the `app.js` file.
- Inside the `/beers` route, call the `getBeers()` method (the **PunkAPI** provides this method, and you can find more about it [here](https://www.npmjs.com/package/punkapi-javascript-wrapper#getbeersoptions)). **Calling the `.getBeers()` method returns a promise that should be resolved with an array of 25 beers**.
- Down the road, you should pass that array to the `beers.hbs` view.

An example of how this method works is shown below:

```js
punkAPI
  .getBeers()
  .then(beersFromApi => console.log('Beers from the database: ', beersFromApi))
  .catch(error => console.log(error));
```

#### 3.2 The `beers.hbs` view

- Create a `beers.hbs` file to render every time we call this route.
- This file should have access to the beers we get as a response from the database. Remember, you should call the `render` method after getting the _beers_ array. _Hint:_ That means inside of the function you're passing to the `then` method. :wink:
- On the `beers.hbs` view, loop over the **array of beers** using an `{{#each}}` loop. Display an **image**, **name**, **description** and **tagline**.

Now, when you click on the `Beers` link on the top navigation or on the `Check the beers` button, you should be able to see all the beers. Boom! :boom:

### Iteration 4 - Random beer _page_

As in the previous step, we will have to focus on creating a route to display a random beer. When a random beer is retrieved, we have to pass it to the view.

#### 4.1 The `/random-beer` route

- Let's create the `/random-beer` route.
- Inside the route, you should call the PunkAPI `getRandom()` method. It returns a promise that will resolve with a different beer object on every call. Look at the [documentation](https://www.npmjs.com/package/punkapi-javascript-wrapper#getrandom) to understand the structure of the data that you're supposed to get back. :+1:

An example of how this method works is shown below:

```js
punkAPI
  .getRandom()
  .then(responseFromAPI => {
    // your magic happens here
  })
  .catch(error => console.log(error));
```

- Eventually, the received beer needs to be passed to the `random-beer.hbs` file. You still don't have this file, so let's proceed to create it.

#### 4.2 The `random-beer.hbs` view

- The `random-beer.hbs` should display the random beer that was retrieved from the database. You should display an **image**, **name**, **description**, **tagline**, **food pairing** and **brewer tips**. The following image shows how this page could look if you give it a bit of style. However, the styling will come later, so, for now, focus on rendering all the information:

![image](https://user-images.githubusercontent.com/23629340/36724536-c5924892-1bb3-11e8-8f22-fd1f8ce316af.png)

Now, every time the user clicks on the _Random beer_ link in the navbar or on the _Check a random beer_ button on the home page, they should see this page with a new, random beer.

**You've just finished all the mandatory iterations. Good job!**

Let's proceed to the bonus iterations.

:::info
On every iteration, you should render a `partial` passing the information regarding the corresponding beer.
:::

### Bonus: Iteration 5 - Beer partial

**Partials represent templates that are likely to be reused.**

Let's see what beer properties we display on the `/beers` _(the beers page)_ and compare them with the properties we displayed on the `/random-beer` _(random beer)_ page:

| properties/ page |      `/beers`      |   `/random-beer`   |
| :--------------: | :----------------: | :----------------: |
|      image       | :white_check_mark: | :white_check_mark: |
|       name       | :white_check_mark: | :white_check_mark: |
|   description    | :white_check_mark: | :white_check_mark: |
|     tagline      | :white_check_mark: | :white_check_mark: |
|   food pairing   |        :x:         | :white_check_mark: |
|   brewer tips    |        :x:         | :white_check_mark: |

As we can see, we have 4 in common properties, which means our code could be a bit more **DRY** if we refactor it using _partials_.

You should create a partial to show each beer.

- First, we need to register where our `partials` will be located. So you need to add the following code to the `app.js` file:

```jsx
hbs.registerPartials(path.join(__dirname, 'views/partials'));
```

- Next, you should create a `partials` folder inside the `views`, and a `beerpartial.hbs` file inside the `partials` folder (**Note**: We're not including dashes in the `hbs` partial names, since handlebars partials need to follow the same naming conventions as JavaScript variables).
- Our `beerpartial.hbs` will display the properties that both views share: **image**, **name**, **description**, and **tagline** of the beer.
- Now, you can go ahead and plug in this partial in the `beers.hbs` view inside the `each` loop.

After creating the partial, and looping over the array of beers, on our `/beers` route, we should have the following:

![image](https://user-images.githubusercontent.com/23629340/36724392-61fa7336-1bb3-11e8-8468-189908167e10.png)

- Also, you can use it on the `random-beer.hbs` page.

Our code shrunk by a lot just because we managed to create a reusable piece of code (the partial), which we can now place wherever we need to use this set of properties.

### Bonus: Iteration 6

Make all the beers on the beers page clickable. If users click on a specific beer, they should be able to see a page with detailed information about that particular beer. **You can reuse the same partial you used for iteration 5**. As a matter of fact, you should. That's what partials are for. The trick is to wrap an anchor tag around every beer that has the beer `id` in the `href` property. Something like:

```html
<a href="/beers/beer-i3f4d34s34b"><!-- name of the beer --></a>
```

To understand how you can get the `id` from the URL, read this section of the [Express docs](http://expressjs.com/en/4x/api.html#req.params).

To find out how you can get an individual beer from the punkAPI using the _beerId_, check out the [`.getBeer(id)` method on the punkAPI docs](https://www.npmjs.com/package/punkapi-javascript-wrapper#getbeerid).

### Bonus: Iteration 7

The overall layout should look like this:

![image](https://user-images.githubusercontent.com/23629340/36723450-8bbcb164-1bb0-11e8-81c3-4fe939730bb9.png)

You will find the `colors` and `fonts` in the `css` file. Remember to link the `css` file to your **main layout**.

Let your artsy side shine! :sparkles:

Happy Coding! :heart:

<br>

## FAQs


<details>
  <summary>I am stuck and don't know how to solve the problem or where to start. What should I do?</summary>

  <br>

  If you are stuck in your code and don't know how to solve the problem or where to start, you should take a step back and try to form a clear question about the specific issue you are facing. This will help you narrow down the problem and come up with potential solutions.

  For example, is it a concept that you don't understand, or are you receiving an error message that you don't know how to fix? It is usually helpful to try to state the problem as clearly as possible, including any error messages you are receiving. This can help you communicate the issue to others and potentially get help from classmates or online resources. 

  Once you have a clear understanding of the problem, you will be able to start working toward the solution.

  <br>

  [Back to top](#faqs)

</details>

<details>
  <summary>When I try to run the app, I get an error "command not found: nodemon"</summary>

  <br>

  Make sure you have `nodemon` installed globally:

  ```bash
  npm install -g nodemon
  ```

  This will install nodemon globally on your system, making it available to all of your projects.

  <br>

  [Back to top](#faqs)

</details>

<details>
  <summary>How to use <code>then()</code> and <code>catch()</code> with Promises?</summary>

  <br>

  When working with Promises or a *function that returns a promise*, you can attach `.then()` method to handle the resolved value and a `catch()` method to handle the possible rejection value.

  Here is an example of how to use `.then()` and `.catch()` to handle a simple promise:

  ```js
  myPromise
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
  ```

  <br>

  Here is an example of using `.then()` and `.catch()` to handle a promise returned by a function/method:

  ```js
  someAPI.getData()
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
  ```

<br>

  If you are trying to execute multiple promises in a sequence, you can do so by returning a promise from a `.then()` block. Example:

  ```js
  someAPI.getData()
      .then((result1) => {
          console.log(result1);
          return someAPI.getData(); // Return another pending promise
      })  
      .then((result2) => { // Handle the returned promise
          console.log(result2);
      })
      .catch((error) => {
          console.log(error);
      })
  ```

  The first line `someAPI.getData()` initiates an asynchronous operation, which returns a promise. The `.then()` method is then called on the promise to handle the resolved value.

  The first `then()` returns another promise with another call to `someAPI.getData()`, which allows to chain another `then()` function that handles the second resolved value, logging it to the console.

  <br>

  [Back to top](#faqs)

</details>

<details>
  <summary>How to use <code>async</code> function and <code>await</code>?</summary>

  <br>

  You create an asynchronous function by using the `async` keyword before the function definition.

  An `async` function allows you to use the `await` keyword inside the function body to wait for a promise to resolve.

  When using an `async` function to handle asynchronous code (e.g. API call) that may potentially throw an error, we have to add a `try`/`catch` block to be able to handle any potential errors.

  ##### Syntax

  ```js
  async function doSomething() {
    try {
      // Code that will be executed asynchronously
      // that might throw an error
    }
    catch (error) {
      // Handle the error
    }
  }
  ```

  <br>

  ##### Using `await` inside an `async` function

  Here is an example of using `await` inside of an `async` function to await for a promise to resolve:

  ```js
  async function getData() {
    try {
      let response = await fetch('https://api.github.com/search/repositories?q=js');
      let data = await response.json();
      console.log(data);
    }
    catch (error) {
      // error message
    } 
  }
  ```

  In the above example, the first `await` is used to wait for the promise returned by `fetch()` to resolve. The value of the resolved promise is then assigned to the variable `response`.

  The second `await` is used to parse the response as json object, and is used to wait for the promise returned by `response.json()`. The resolved value is then assigned to the variable `data`.

  The function uses the `return` keyword to return the `data` to allow consuming the value outside of the function.

  <br>

  ##### An `async` function always returns a Promise

  The difference between a *regular function* and an `async` function is that the **`async` function always returns a Promise**. 

  Once defined, you can invoke an `async` function just like a regular function and **handle the Promise it returns using `.then()` and `.catch()` or `await`**.

  Here's an example of using `then` and `catch` to handle a Promise returned by an `async` function:

  ```js
  async function greeting() {
    // An `async` function always returns a promise
    // This value will be returned as a Promise
    return "HELLO IRONHACKERS!";
  }

  greeting()
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log("Error:", error);
    })
  ```

  <br>

  Here's an example of handling the same `async` function but this time using `await`:

  ```js
  async function greeting() {
    // Async function always returns a promise
    // This value will be returned as a Promise
    return "HELLO IRONHACKERS!";
  }

  // We need another wrapper `async` function so that we can use `await`
  async function wrapperFunction() {
    try {
      const result = await greeting(
      console.log(result);
    }
    catch (error) {
      console.log("Error:", error);
    }
  }
  ```

  Note that we needed another wrapper `async` function to be able to use `await`.

  <br>

  [Back to top](#faqs)

</details>

<details>
  <summary>How to use <code>try</code> / <code>catch</code> block?</summary>

  <br>
  
  The `try`/`catch`  block is used to handle errors that occur during the execution of a program.

  The `try` block contains the code that might throw an error, and the `catch` block contains the code that will handle the error.

  Here is an example of using a `try`/`catch` block:

  ```js
  try {
    // Code that might throw an error
  } catch (error) {
    // Handle the error
  }
  ```

  <br>

  The `try`/`catch` block is typically used in `async` functions when handling asynchronous code that may potentially throw an error.

  Here is an example of using a `try`/`catch` block in an `async` function when handling a promise:

  ```js
  async function doSomething() {

    try {
      // Code that might throw an error
      const result = await someAsyncFunction();
    }
    catch (error) {
      // Handle the error
      console.error(error);
    }
    
  }
  ```

  In the above example, the `try` block contains an asynchronous operation that might throw an error:  `await someAsyncFunction()`. If an error is thrown, execution will automatically jump to the `catch` block.

  <br>

  [Back to top](#faqs)

</details>

<details>
  <summary>I got the error: "Cannot find module" Node.js". How can I resolve it?</summary>

  <br>

  The error "Cannot find module" in a Node.js application means that the module you are trying to import or use does not exist in your project or cannot be found by Node.js.
  There are a few things you can try to resolve the issue:

  1. **Dependencies are not installed**: Make sure that all dependencies are installed.
   To do this, run the command `npm install` in the root folder of your project.
   This will install all of the dependencies listed in the project's `package.json` file, and ensure that all of the modules that your Node'js application requires are available.

  2. **Module is not installed**: Make sure that the *package* you are trying to use is listed in the project's `package.json` and that it is installed.
   To do this, run the command `npm install <package_name>`, replacing the `<package_name>` with the name of the package.
   This will add the package to the list of dependencies in the `package.json` file, and install it in the project.

  3. **Module is not imported:** Make sure that you've imported the module/package correctly and that the `require` statement is spelled correctly and available in the correct place in your code.

  4. **Wrong file path:** If you are importing another file as a module, make sure that the file you are trying to require is located in the correct folder and that you are using the correct file path.

  5. **Wrong module/package name:** Check the spelling of the package name you are trying to import.

  <br>

  [Back to top](#faqs)

</details>

<details>
  <summary>Why are my CSS styles not loading after linking the stylesheet?</summary>

  <br>
  
  There are a few reasons why your CSS styles might not be loading after linking the stylesheet:

  1. **Incorrect file path**: Make sure that the file path for the stylesheet in the `link` tag of your Handlebars template is correct. If the path is incorrect, the browser will not be able to locate the stylesheet and the styles will not be applied.

   For example, if the file structure of your project is as follows:

   ```
   - views/
       - layout.hbs
       - index.hbs
   
   - public/
       - stylesheets/
           - style.css
   ...
   ```

   The correct file path for the stylesheet in the `link` tag of the `layout.hbs` file would be:

   ```html
   <link rel="stylesheet" href="/stylesheets/style.css">
   ```

   ***Important***: The `href` path starts with a `/`, representing the path starting from the base folder where the static files are being served from, in this case, the `public/` folder.

  2. **Incorrect file name:** Make sure that you are referring to the file by its right name in the `href` of the `link` tag.

  3. **Middleware not configured correctly**: Make sure that you have the `express.static` middleware, that serves static files correctly configured in your Express app and that the right folder path and name are specified. If this middleware is not set up correctly, the server will not send the stylesheet when requested.

  4. **Restart the server:**  Sometimes, even if you made the correct changes, the browser might still be loading an old version of the file. You should try restarting your Express server. This will ensure that the new changes are loaded and being served by the server, making sure the browser will load the most recent version of the stylesheet."

  <br>

  [Back to top](#faqs)

</details>

<details>
  <summary>Why are my images not loading/displaying on the page?</summary>

  <br>
  
  There are a few reasons why your images might not be loading after linking the file:

  1. **Incorrect file path**: Make sure that the file path for the image in the `img` tag of your Handlebars template is correct. If the path is incorrect, the browser will not be able to locate the stylesheet and the styles will not be applied.

   For example, if the file structure of your project is as follows:

   ```
   - views/
       - layout.hbs
       - index.hbs
   
   - public/
       - images/
           - dog.jpg
   ...
   ```

   The correct file path for loading the image in the `index.hbs` file would be:

   ```html
   <img alt="dog" src="/images/dog.jpg" />
   ```

   ***Important***: The `src` path starts with a `/`, representing the path starting from the base folder where the static files are being served from, in this case, the `public/` folder.

  2. **Incorrect file name:** Make sure that you are referring to the file by its right name in the `src` of the `img` tag.

  3. **Middleware not configured correctly**: Make sure that you have the `express.static` middleware, that serves static files correctly configured in your Express app and that the right folder path and name are specified. If this middleware is not set up correctly, the server will not send the images when requested.

  4. **Restart the server:**  Sometimes, even if you made the correct changes, the browser might still be loading an old version of the file. You should try restarting your Express server. This will ensure that the new changes are loaded and served by the server.

  <br>

  [Back to top](#faqs)

</details>

<details>
  <summary>What is the difference between the .html and .hbs files?</summary>

  <br>

  A `.hbs` file is a Handlebars template file. Handlebars is a templating library, used on the server side in Node.js to generate HTML pages from template files. Handlebars allow you to write templates that are more expressive and readable than plain HTML, and it also allows you to reuse code. Handlebars uses double curly brace `{{ }}` syntax to specify placeholders for data in templates.

  So in short, `.hbs` is the format of the Handlebars template files and `.html` is the end format and the file generated after the `.hbs` template has been processed.

  <br>

  [Back to top](#faqs)

</details>

<details>
  <summary>My links are not working properly. Should I use a relative or an absolute path?</summary>

  <br>
  
  When linking to other pages within your Express app, as a general rule you should use relative paths that start with a forward slash `/`.

  This way you ensure that the links will work correctly both in your development environment and when the app is deployed.

  For example, instead of linking to a page with an absolute path like this:

  ```html
  <a href="http://yourdomain.com/contact"> Contact </a>
  ```

  You should use a relative path starting with a forward slash `/` like this:

  ```html
  <a href="/contact"> Contact </a>
  ```

  If you are embedding values in your Handlebars template, you should still use the relative path that starts with a forward slash `/` like this:

  ```hbs
  <a href="/projects/{{id}}" > About </a>
  ```

  <br>

  [Back to top](#faqs)

</details>

<details>
  <summary>I got the error "Error: listen EADDRINUSE: Address already in use". How do I fix it?</summary>

  <br>

  This error means that the port is taken by another process that is still running on that port. 

  To fix the issue, you need to kill the process using the port and then run the command again. Here's how to do it:

  #### On Mac/Linux

  To kill the process running on port `3000`, run the following command in the terminal:

  ```bash
  sudo kill -9 $(lsof -t -i:3000)   
  ```

  **Important:** Replace the above example port *3000* with the port number of the process you are trying to kill.

  <br>

  #### On Windows

  ##### 1. Using the Task Manager

  To kill the running process on Windows using the Task Manager do the following:

  1. Open the **Task Manager** by pressing: **<kbd>Ctrl</kbd>** + **<kbd>Shift</kbd>** + **<kbd>Esc</kbd>** 
  2. Find the Node process you want to terminate.
  3. Right-click and select **End Task**

  <br>

  ##### 2. Using Command Prompt

  To kill the running process on Windows using the Command Prompt do the following:

  1. Open the windows **Start** menu
  2. Search for **CMD** in the search bar
  3. In the search results, right-click on **Command Prompt** and select **Run as administrator**. This will open the Command Prompt terminal.
  4. In the Command Prompt terminal, run the following command to find the process ID:

   ```bash
   netstat -ano|findstr "PID :3000"
   ```

   > If the process happens to be running on another port, simply replace `3000` with the number the port number the process is running on.

   This will return the process id (PID). You should then run the following command using the process id (PID) you got in the previous step to terminate the process:

   ```bash
   taskkill /PID 12345 /f
   ```

   **Important:** Replace the above example PID *12345*, with the process id (PID) you got in the previous step.

  <br>

  [Back to top](#faqs)

</details>

<details>
  <summary>I got the error "Port is already in use". How do I fix it?</summary>

  <br>

  This error means that the port is taken by another process that is still running on that port. 

  To fix the issue, you need to kill the process using the port and then run the command again. Here's how to do it:

  #### On Mac/Linux

  To kill the process running on port `3000`, run the following command in the terminal:

  ```bash
  sudo kill -9 $(lsof -t -i:3000)   
  ```

  **Important:** Replace the above example port *3000* with the port number of the process you are trying to kill.

  <br>

  #### On Windows

  ##### 1. Using the Task Manager

  To kill the running process on Windows using the Task Manager do the following:

  1. Open the **Task Manager** by pressing: **<kbd>Ctrl</kbd>** + **<kbd>Shift</kbd>** + **<kbd>Esc</kbd>** 
  2. Find the Node process you want to terminate.
  3. Right-click and select **End Task**

  <br>

  ##### 2. Using Command Prompt

  To kill the running process on Windows using the Command Prompt do the following:

  1. Open the windows **Start** menu
  2. Search for **CMD** in the search bar
  3. In the search results, right-click on **Command Prompt** and select **Run as administrator**. This will open the Command Prompt terminal.
  4. In the Command Prompt terminal, run the following command to find the process ID:

   ```bash
   netstat -ano|findstr "PID :3000"
   ```

   > If the process happens to be running on another port, simply replace `3000` with the number the port number the process is running on.

   This will return the process id (PID). You should then run the following command using the process id (PID) you got in the previous step to terminate the process:

   ```bash
   taskkill /PID 12345 /f
   ```

  **Important:** Replace the above example PID *12345*, with the process id (PID) you got in the previous step.

  <br>

  [Back to top](#faqs)

</details>

<details>
  <summary>I got the error "Refused to apply style ... ('text/html') is not a supported stylesheet MIME type". What should I do?</summary>

  <br>

  This error most commonly occurs when the browser attempts to load a resource (i.e., stylesheet) but the server instead returns an HTML page. For example, if there is an issue with the file path and the server is unable to serve the file, it may return a 404 HTML page.

  There are a few things you should look at to troubleshoot this:

  1. **Try accessing the file directly:** To verify that the server is returning an HTML page instead of the requested file, copy the file path and try to access the file directly from a new browser tab.

  2. **Check the file path**: Make sure that the file path used is correct and that the file actually exists in that location. If there is a typo or error in the file path, the server will not be able to find the file.

  3. **Check the static files middleware configuration**: Check that your `express.static` middleware, which serves static files, is correctly configured and that the right folder path and name are specified. If this middleware is not set up correctly, the server will not send the images when requested.  

  <br>

  [Back to top](#faqs)

</details>

<details>
  <summary>I am getting an error: "not defined". How do I fix it?</summary>

  <br>

  The "ReferenceError: variable is not defined" error in JavaScript occurs when you try to access a variable or a function that has not been defined yet, or is out of scope. 
  To fix the issue, check that you have defined the variable or function that you are trying to use and double-check the spelling to make sure you are using the correct name.
  In case the variable or a function is defined in another file, make sure that the file has been imported or loaded correctly.

  <br>

  [Back to top](#faqs)

</details>

<details>
  <summary>I am unable to push changes to the repository. What should I do?</summary>

  <br>

  There are a couple of possible reasons why you may be unable to *push* changes to a Git repository:

  1. **You have not committed your changes:** Before you can push your changes to the repository, you need to commit them using the `git commit` command. Make sure you have committed your changes and try pushing again. To do this, run the following terminal commands from the project folder:

   ```bash
   git add .
   git commit -m "Your commit message"
   git push
   ```


  2. **You do not have permission to push to the repository:** If you have cloned the repository directly from the main Ironhack repository without making a *Fork* first, you do not have write access to the repository.
  To check which remote repository you have cloned, run the following terminal command from the project folder:

   ```bash
   git remote -v
   ```

  If the link shown is the same as the main Ironhack repository, you will need to fork the repository to your GitHub account first, and then clone your fork to your local machine to be able to push the changes.

  Note: You may want to make a copy of the code you have locally, to avoid losing it in the process.

  <br>

  [Back to top](#faqs)

</details>
