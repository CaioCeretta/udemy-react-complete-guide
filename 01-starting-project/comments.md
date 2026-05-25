## Section 3 - React Essentials

• JSX allows us to write HTML code inside of javascript files

• Declarative Code: React is about describing and creating user interfaces. We define the target HTML structure & UI, not
the steps to get there.

• Not supported by browsers. The code that we see in index.jsx and app.jsx files would not work in browsers. Instead, the
code we write as a React developer is transformed in the background into code that is understood by the browser by the
development server before it reaches it.

. In order for a function be recognized and used as a component in React, it is a function that must follow two rules.

1. Function name must start with uppercase
. Multi-word should be written in PascalCase
. It is *recommended* to pick a name that describes the UI building block, like Header/AdminHeader

2. The function must return a "renderable" content
. Value that can be rendered (displayed on the screen) by React
. In most cases: Return JSX also allowed: string, number, null, array of allowed values

• We define functions with the function keyword, but do invoke it with, e.g. `Header()`. But that's not how we use a React
component, istead, it will be the library that will, under the hood, to execute these functions. it will understand what
it should be shown on the screen and instead of being invoked with (), react allows us to use our component functions like
regular HTML tags inside our JSX code. 

• When inspecting the source code of the app, we will notice that we won't find the Header, nor any other web site content
in that source code. No imagine, no titles, nothing. Just some metadata and at least one javascript file being imported.
That loaded js file, the index.js file, is the key. The code that is loaded and executed there, is in the end, the transformed
react code we wrote. Therefore, at the end of the day, the index.html file is the one being served to the browser

• Inside the index.jsx, is the App component funciton that is being imported into the file and in the file the app component
is being used as value/argument for the createRoot function that is being called. To be precise, this is the first file
to be loaded by the react app, commonly set up inside the package.json. Commonly set to the index.js of the built index

• Inside the rendered html, we will only see what we have defined in the index.html. React uses the div with the id of
root, to render all its jsx inside of it.

• We can also see why our functions must be uppercase. html, div, image, p, are all html tags that start with lower case
but custom components on the other hand (components created by us as developers), must start with uppercase character to
tell React that is not a built in component. That is how React can tell custom components apart of built in components.
This not only prevent potential name classes (e.g Header with <header>), but it also changes how react handles components.

Built in components, like header, image, div, and so on, are rendered as DOM nodes by react. Custom components on the other
hand are just functions and are there to be executed as functions by React. Then, it then just takes a look at them, takes
the returned JSX code and starts analzyzing that code until it ends up with only built in elements and at a certain point
of time, it then renders on the screen

### Components

• React projeects must be built via build process before deployment. This means that the code we write is different from
the code we deploy, which is a bundle of generated files that include our optimized code and any other extra asset. This
makes us able to access images differently. Where we were used to write something as "src/assets/react-core-concepts.png",
now we add our images relative to the app.jsx file like, for example

```js

import reactImg from './assets/images/react-core-concepts';

/*  But this would look rather strange, because importing an image file inside a javascript file is not something we
normally do in javascript. But this will work because of tht  same build process that will also make that JSX code to
work. Like the ./index.css import in the index.jsx file  */
```

• One of the main advantages of using components is that they are reusable and we can use them as often as we want.
For example, imagine we have a list of "Core Concepts", and we want each concept to have its own block, layout, etc.
We would then create a CoreConceptItem, and create it differently based on properties we pass to it. This way we can
define a normal javascript function once and use it multiple times.

• Object destructuring in the function parameters:

When defining a component like:

`function CoreConcept({ title, description, img }) { ... }`

React is passing an object

{
  title: "Component",
  description: "UI block",
  imgUrl: "img.png"
}

And the function extracts (destructres) the properties directly in the parameters.

Without destructuring, it would be accessed like

`function CoreConcept(props) { console.log(props.title)}`

And with destructuring

`function CoreConcept(props) { console.log(title)}`

• Named Parameters:

In typescript and POO, we often define functions where we define the arguments by name. Order doesn't matter, and the owm
language natively understands it. One example would be:

```ts
class User {
  constructor({
    name,
    age,
    admin
  }: {
    name: string;
    age: number;
    admin: boolean;
  }) {
    console.log(name);
  }
}

new User({
  age: 20,
  name: "Caio",
  admin: true
});
```









