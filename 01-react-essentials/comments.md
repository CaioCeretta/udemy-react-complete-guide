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
   . It is _recommended_ to pick a name that describes the UI building block, like Header/AdminHeader

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

### Components Pt. 1

• React projeects must be built via build process before deployment. This means that the code we write is different from
the code we deploy, which is a bundle of generated files that include our optimized code and any other extra asset. This
makes us able to access images differently. Where we were used to write something as "src/assets/react-core-concepts.png",
now we add our images relative to the app.jsx file like, for example

```js
import reactImg from "./assets/images/react-core-concepts";

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
    admin,
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
  admin: true,
});
```

• Props Alternative: Instead of writing something as

`<CoreConcept title={coreConcept.title} description={coreConcept.description} image={coreConcept.image}>`

We can simply write

`<CoreConcept {...coreConcept}>`

By spreading the object like this, it will pull out all the key values pairs based on the object properties. In the case
where the properties we expect in a Component, are the same as the one we are defining in the object. This would work
just like the above.

• Destructuring Component Parameters

When we define something as `function CoreConcept({title, description, image}){...}`, what title is receiving is the first
parameter of the props object.
Object destructuring in javascript basically means that we can target the different properties of the incoming object by
name and we have to use the same properties as we are setting as props.

We have to use the exact same words in those curly braces equal to the properties. And when doing so JS will then go ahead
and give us these three properties as standalone variables in the function.

• Scoped Styles

One interesting thing to keep in mind, is that the styles, defined in .css files, are not scoped. Which means that, if for
example, the index.css used globally does not contain any header style, but a <Header> component imported in the App.jsx
that contains a `Header.css`, in which there are styles for the header. When we create a header inside of that app.jsx
it will use the stylings defined in the header.css.

This happens because as soon as a component is mounted, his CSS is injected globally in the <head> of the page.

• `children` Prop vs `Attribute Props`

1. children:

`<TabButton>Components</TabButton> - function TabButton({children}) { return <button> {children} </button >}`

Using children inside of a component is usually used for components that take a single piece of renderable content, this
approach is closer to "normal HTML usage". It is especially convenient when passing JSX code as a value to another component

2. Attribute Props:

`<TabButton label="Components" /> - function TabButton({label}) { return <button> {label} </button >}`
Using attributes makes sense if we have multiple smaller pieces of information that must be passed to a component.
Adding extra props instead of just wrapping the content with the component tags mean extra work

This is down to personal preference. But the two approaches may be seen in overall projects.

• Selecting Elements

In Vanilla JS we woul typically add event listeners to HTML elements with:

`document.querySelector('#myButton').addEventListener('click', () => { console.log('clicked')})`

But in React, we are not in VanillaJS. When working with React we don't want to write imperative code like that. Instead,
we want to write declarative code, therefore, when working with React as developers, we really don't want to start interacting
with the DOM/with the page with codes like this.

In React, we add a special attribute to these elements, named "onClck". onClick points to a function that should be executed
when that event occurs. We can either define an anonymous function inside the onClick, or utilize a previously created
function on the event, the name of that function usually has to do with the event, like `handleClick`

• Toggling between core concepts menu list

By default, when just passing handleSelect as a value to onSelect, and to that onClick, we don't get the identifier because
that is some logic specific to our application and react does not know we want such identifier.

In order to fix this and to have to control on how `handleSelect` is being executed by React, we can do this by instead of
pointing to that handleSelect function, but to pass an arrow function to the onSelect property.

Instead of simply passing the function by reference with onSelect={handleSelect}, we pass an arrow function as a value to
that property with `onSelect={() => handleSelect()}`. By doing it like this, it won't be called as soon as a component
mounts, but when that line of code is parsed, it is just the arrow function that will be defined not the code inside of
it.

Now, since we are using that arrow function, we can write something as `handleSelect('components')` to pass a string
identifier to it. That same function must now receive a parameter of the current page to alter its styling

• dot notation or bracket notation for objects?

We had an example, where we had a state named tabContent, and as soon as we clicked on the button "components", that string
would be assigned to the tabContent state. After that, i would render a dynamic object information based on that key,
which in the object, is also component. Should i use dot or [] on that case?

Assume we have an object inside the data.js like this

```js
  export const EXAMPLES = {
  components: {
    title: "Components",
  },

  jsx: {
    title: "JSX",
  },
  ...
```

Its keys are "components", "jsx", ...

After that, in our App,jsx, we have something like

`const [tabContent, setTabContent] = useState('')`

And this state will hold WHICH menu button was selected.

Therefore, when calling handleSelect('components'), React sets that state as 'components' and tht state is equal to
'components'

Here we have the two options of the dot and the bracket:

1. dot notation (`EXAMPLES.tabContent.title`)

dot does not use the value of the variable, it will literaly fetch for EXAMPLES.tabContent. But that object does not exist
and EXAMPLES.tabContent turns out to be undefined.

JS interprets the not notation in a literal way

2. brackets notation (`EXAMPLES[tabContent].title`)

When we do this way. JS replaces the value of the variable tabContent to components, and it will work as expected.

• Constants that hold HTML

We have seen that we could define a let variable with a `<p>` tag, and replace the content of that p tag according to the
state, e.g.

```js
let selectedTopic = <p>Please select a topic</p>;

/*  In this case, the parentheses on the string is just to improve readability and visual organization. It would also work
without it */

if (tabContent) {
  selectedTopic = (
    <div id='tab-content'>
      <h3>{EXAMPLES[tabContent].title}</h3>
      <p>{EXAMPLES[tabContent].description}</p>
      <pre>{EXAMPLES[tabContent].code}</pre>
    </div>
  );
}
```

And put that at the place we were outputing that text.


• Component conditional return

There are three ways that we can conditionally return a component function

1. Ternary Operator (For simple conditions)

It is ideal when we have a logic "A or B", like

```js
return (
  <div className="container">
    isDeleting ? (
      <DeletingLoader />
    ) : (
      <DeleteConfirmation onConfirm={handleDelete} />
    )
)
```

2. Short-circuit with && (For "All or nothing" conditions)

If we don't need an else, the && operator is much cleaner. It renders the component only if the condition is true

```js
return (
  <div>
    {isDeleting && <ModalLoading />}
    <button onClick={() => setIsDeleting(true)}>Deletar</button>
  </div>
);
```

3. Element variables (best option for clarity)

If the logic start getting confuse, the best practice is to remove the logic from the return and assign it to a variable.
That will keep our JSX cle an and easy to visually scan it

```js
const renderContent = () => {
  if(isDeleting) return <DeletingDiv />

  return (
    <div data-test-id="alert">
      <h2>Are you sure?</h2>
      <button>Proceed</button>
    </div>
  );
}

return (
  <div className="wrapper">
    {renderContent()}
    <button onClick={() => setIsDeleting(!isDeleting)}>Toggle</button>
  </div>
)
```

When to use each really depends on the case

The ternary is more used when we have two short exclusive options, like a login and logout
The && operator is used when we want to show something only when certain condition is met
The variable/funmction is when the logic is complex or the HTML block is too big

We must always avoid nesting ternaries. If we get to this point, the code will start getting really confuse. In those cases
we should use a `switch` or an `if/else` before the return

• Logic operators to decide what to return

We need to be careful when deciding what to return with a && operator

In JS, the `return` is a instruction (statement), and operators like && or the ternary `? :` wait for expressions (values).
Sometimes, we can't put a `return` inside a logic operator. Here are some points to always be careful

1. Return instruction inside of logic

Assume we try to make something as

isDeleting && return ...

This is syntactically impossible in JS. The return must come first, and what comes after it, is what is going to be returned

2. Incomplete ternary syntax

We must always put content both after the ? and after the :

• Instructions (Statements) vs Expressions

1. `if` is a *struction (statement)*

`if` is like a doorman. It decides which path the code will follow. Inside the {} blocks of an `if`, we can place any
command, including `return`

This works
if(condition) {
  return <Alert> // Return is an output command
}

2. The `&&` and the ternary are *expressions*

A expression is somethjing that result in a value, like 2 + 2 results in 4. JS tries to resolve everything that is on that
line to reach a final result.

The `return` is not a value. It is an action of finishing a function. That's why we can't mix it in the same operation

`const result = condition && return <Alert />`

This won't work because JS basically thinks: "How am i going to calculate the value of something that tells the function to
stop"



