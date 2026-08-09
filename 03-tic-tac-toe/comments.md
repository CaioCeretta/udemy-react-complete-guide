## Intro

Even though the game might not look too complex, there are many important patterns and important concepts we can explore
while building this game.

## Not all content must go inside of components

## Initial Comments

Instead of defining the initial HTML inside the App.jsx, we are going to grab that code we would add inside the App
component and add it into the index.html. 

In the end, that index.html is the file that holds the div with id root and is the one that all of our app is rendered
inside. But when working with React, we can still add more markup to that file, if we need more markup in there.

We can define headers in the index.html, in case it does not contain any state or prop that defines what is going to be
displayed in there. We can, for example, set the header on top of the div that renders
our whole app.

When working with react, it's too easy to forget that we can do things like this.
We don't always have to put everything inside our components. Of course, most of
our web application's markup is going to go into our component, and all of our web
application's logic is also going to go in there. But if we have some static markups,
some static data like the header, we can put it right into the index.html file.

## public/ Folder 

We can store images in the public/ folder and then *directly reference* them from our index.html or index.css files. The
reason for that is that images (or, in general, files) stored in public/ are made publicly available by the underlying
project development server & build process. Just like index.html, those files can directly be visited from the browser
and can therefore also be requested by other files.

If we try to load 'localhost:5173/some-image.jpg', we'll be able tgo see that image if it exists in public/ folder.

### The src/assets/ Folder

We can also store images in the src/assets/ folder (or, actually, anywhere in the src folder).

So what is the difference compared to public/ ?

Any files (of any format) stored in `src` (or sub-folders like `src/assets/`) are not made available for the public. They
can't be accessed by website visitors. If we try loading `localhost:5173/src/assets/some-image.jpg`. We get an error.

Instead, files stored in `src/` (and sub-folders) can be used in our code files. Images imported into code files are then
picked up by the underlying build process, potentially optimized, and kind of *injected* into the `public/` folder right
before serving the website. Links to those images are automatically generated and used in the places where we referenced
the imported images.

### So which folder should we use? 

We use use `public/` folder for any images that should not be handled by the build process and that should be generally
available. Good candidates are images used in the `index.html` file or favicons.

On other hand, images that are used inside components should typically be stored in the `src/` folder (e.g. in `src/assets/`)

## Initial App.jsx component

We will start by creating the overall structure of this component.

The main tic-tac-toe game will consist of a main where we have the `Player`, the `Game Board` inside a div and outside of
that div, the logs of that game

The players will consist of a `ol` element, because the order matters.

That `ol` will be styled as a flex container, with no padding and a margin that will separate that component from the top
and bottom. And be justified between, for both elements to have the same spacing.

## Concept Repetition: Splitting components & Building reusable components

Next to the players li, we will have a Button to edit each player's name. But as we can see, the "exact" same code for each
player will be repeated. Even though there will be only one repetition. In order to make the code clearer and easier to
maintain. We should create a component for this, and only change the properties

## Concept Repetition: Working with state

Now, what we will do is to show an input field, whenever the Edit button is clicked.

Here i had two approaches

### My Approach

I've created two states, one named isEditing, and the other playerName

The approach i took was to, whenever clicking on the edit button, changing the isEditing state to true, which would lead
to the input being displayed. Then, based on that input element, whatever was being typed would change the playerName
state, based on a onChange property

To keep the reference from the input being passed. in the span that displayed the player's name, i would use

{ name || playerName}. Which means that, use the name received as property in case the name wasn't edited.

### Instructor's Approach

The instructor chose to have only one isEdition state, and then a variable that would be dynamic and define the text
of the span, which is

instead of doing something like <span ...>{name || playerName} </span> as i did, was to define a new variable, that based
on the isEditing state would display an input or a the actual value.

It was to show that we can hold jsx values inside variables. Then, on the span's name block, utilize that variable we
have just created

## Component Instances: Work in Isolation

As we can see in the application, if we click on edit, we show the input field, but the other player component remains
the same.

This detail is important because we are showing the same player component, but whenever we are using or reusing a component,
React will basically create a new isolated instance. Even though both of these players use the same component, they work
totally isolated from each other. If the state in the first player component instance changes, the second player component
instance does not care about that at all, it does'nt even know about that.

Meaning we have a shared component with the same logic inside of it, but once we use that component, totally isolated
instances are created, which only uses the same logic, but they then use it on their own.

Having this isolation allows us to build complex reusable components that don't interfere with each other

## Conditional Content & A Suboptimal Way of Updating State

We can choose to determine the button's text based on a variable that will be dynamic according to the isEditing state
or utilize a ternary on the button text, that will also be dynamic according to the state. But we'll stick to the ternary
option

If we wish to use the `name` as a value for the input value prop. By clicking on edit and with the input showing, we will
see that is pre populated with the name prop. However, here we would clash with a concept named `Controlled Components`

### Controlled Components

In the traditional HTML, a `<input>` maintains and manages its own state. However, in React, when we define the `value`
property of an input, React takes full control over what is displayed there. React becomes the only "source of truth"

If we do something like

<input type="text" value={props.value} />

When we try to type anything, the browser will notify React: "The user typed the letter A". However, since there is no
`onChange` function to update the variable being passed, React will look to the `props.value` and say "The value must be
what is on the prop". And it enforces the input to go back to the original value instantly, which would cause us to think
that the input is "locked".

#### Common assumption

We know that a component re-renders whenever a state changes or a parent property changes. And since there is no onChange
updating a state or calling a parent function to modify the prop, the component doesn't go through a new rendering.

And we may think that this is why we can't type on the input. Because it is not simply like "Nothing tells React that
the value has changed" when something is typed, but React actively undo our typing.

What happens is a "internal fight" between the browser (Real DOM) and React (Virtual DOM). It works in this order:



To solve this we have two options


#### Solution 1 - Use `defaultValue` (Non-Controlled Component)

If our objective is just filling the input with a initial value, and then allowing the user to freely type without React
needing to control each typed letter, we should use `defaultValue` instead of `value`

Here the input starts with props.value, but the user can edit freely
<input type="text" defaultValue={props.value} />

In this case, the input is considered Uncontrolled. React defines the initial value, but then, the DOM takes control of
what is typed.

#### Solution 2 - Using local state (Controlled Component)

If we need to read what the user is typing in real-time (to make validations, enabling submit button, etc). We have to
transform that initial prop in a local state using useState and then, the onChange event.

This way, on each typed letter, onChange fires, updates the text state, and React renders again with the new letter, allowing,
normal typing.

## Reference vs Primitive Values

### What are Primitives?

An example

`var age = 30`

The `age` variable (which we could also use `let` or `const` by the way) stores a number value. The number value is 30.
Number values are called "primitive values" because they're very simple building blocks of JavaScript apps. 

Other simple building blocks are

var name = "Caio" // strings are also primitives
var isMale = true // so are booleans

As well as undefined and null are also primitive.

### What are reference types then?

So, we understood that primitives are. And Reference types are objects and arrays

```javascript
var person = {
  name: "Caio",
  age: 30
}

var hobbies = ['Training', 'Studying']
```

Here, person is an object, therefore a reference type. It holds properties that in turn have primitive values. This doesn't
affect the objects being a reference type, though. And we could also have nested objects or arrays inside of other objects
like `person` object.

The hobbies array are also a reference type, and in this case, it holds a list of strings which is in turn, is a primitive.
But arrays remain being primitives.

### What is the difference?

The difference is relate to memory management

Behind the scenes, JS has to store the values we are assign, and they are either `Stack` or the `Heap`.

## Stack vs Heap

In JS and in most programming languages, the memory is mainly divided in two areas: Stack and Heap. The main difference
between them is how the data is stored and the type of data they hold.

In JS they work as the following:

### 1. Stack (Pile of Memory)

Think of the Stack as a organized pile of plates. It is quick, structured, and has a fixed size. The computer knows exactly
how much space an item will take even before the code running (static allocation). It follows the LIFO principle

What JavaScript stores in here:

° Primitive Types: Simple and with fixed size data, this includes `String`, `Number`, `Boolean`, `Undefined`, `Null`, `Bigint`
and `Symbol`
° References (Pointers): Memory addresses that point to where the most complex objects are stored in the Heap

### 2. Heap ("Mount")

Think of the Heap as a large messy storage where we can store boxes of any size. It is used for dynamic data, which the size
can increase or decrease, while the program is running, and the computer doesn't yet knows its size.

What JavaScript stores here:

° Reference types: Complex data like Objects ({}), Arrays([]) and functions.

### How do they work together in practice

A common example to illustrate the difference is

```javascript

  // 1. Primitive type

  let name = "Caio";
  let age = 30;

  // 2. Reference type

  let user = {
    name: "Alex",
    age: 38
  }
```

What happens behind the scenes:

1. When we create `let name = "Caio"`, JS sees a text that is a string (primitive). It goes direct to the Stack and stores
the value "Caio" in there.

2. When we create `let user = {...}`, JS sees an object. Objects can grow, so it creates it on the Heap

## "
" Behavior on Reference Types

The fact that only pointers are stored on the stack for reference types matter a lot!

### What's actually stored in the `person` variables in th following snippet?

`var person = { name = "Caio"}`

Is it
a) The object?
b) The pointer to the object
c) A pointer to the name property?

The answer is b. A pointer to the person object is stored in the variable. The same would be the case for `hobbies` array.

### What does the following code spit out then?

```js
var person = { name: "Caio" }
var newPerson = person
newPerson.name = "Alex"
console.log(person.name)
```

In this case, we see Alex on the console. Why? Because we never copied the person object itself to newPerson. We only
copied its pointer.

It still points to the same object address in memory. Hence, changing newPerson.name also changes person.name because
newPerson points at the exact same object.

This is the same for arrays.

```
var hobbies = ['Gym', 'Gaming'];
var copiedHobbies = hobbies;
copiedHobbies.push("Music");
console.log(hobbies[2]) // Prints out Music
```

This is also because copiedHobbies points to the exact same address as hobbies in memory.

### So how can we copy the exact same value?

Now that we know that we are only copying the pointer, how can we actually copy the value behind the pointer? The actual
object or array?

We basically need to construct a new object or array and immediately fill it with the properties or elements of the old
object or array.

We have multiple ways of doing this, also depending on which kind of JS version we are using during development

#### Here are some of the most popular approaches for arrays

##### For Arrays: 

1. Use the slice() method.

```javascript
  var hobbies = ["Sports", "Gym"]
  var copiedHobbies = hobbies.slice()
```

It basically returns a new array which contains all elements of the old element, starting at the starting index we passed,
and then up to the max number we define. If we simply call `slice()`, without arguments, we get a new array with all elements
of the old array.

2. Using the spread operator

```javascript
  var hobbies = ["Sports", "Gym"]
  var copiedHobbies = [...hobbies]
```

Here we are creating a new array, (manually by using []), and then the spread operator to pull all elements of the old
array out, and add them into the new array

##### For Objects

1. Object.assign()

We can use the `Object.assign()` syntax.

```js
  var person = { name: "Max" }
  var copiedPerson = Object.assign({}, person)
```

This syntax creates a new object (the {} part) and assigns all properties of the old object (the second argument) to that
newly created one. This creates a copy

2) Spread operator

`var copiedPerson = {...person}`

This will also create a new object, because we used ({}) and will then pull all properties of `person` out of it, into the
brand-new object

##### Some differences

Even though the spread operator act basically the same, the way it is extracted is a bit different.

If we have an array, and log its content with something like console.log({...hobbies}), it would then print out each of
value as individual argument, some it would simply print out different values separated by spaces.

Objects, on other hand, if we try to, directly spread the properties inside a console.log, it would print out a warning
saying that `user is not iterable`. 

When spreading an object, it is required for that spread to occur inside a curly braces, because

. Arrays are built-in iterables, meaning Javascript knows how to loop through them item by item when they are spread
. Plain JS objects are not iterable by default. JavaScript doesn't inherently know whether we want to spread keys, values,
or entries, so it throws a TypeError. 

## Deep Copy

### What is a Deep Copy?

A deep copy runs recursively through all the layers of an object or array (no matter how nested they are) and creates
new instances of *every* object/array it encounters along the way.

• Shallow Copy: Level 1 is the new, but levels 2, 3+ point to the same place in memory as the original
• Deep Copy: All the levels are cloned. Modifying an internal object in the copy doesn't affect the original object.

### How to make a deep copy in JS?

#### 1. Native and modern solution

Nowadays, the most recommended, clean way of doing this is by using the global function `structuredClone()`. It was
introduced for the very purpose of solving this problem without needing to use external libraries.

```js
  const original = {
    name: "Caio",
    address: {
      city: "Votorantim",
      cep: "123456-78"
    },
    hobbies: ["Studying", "Training"]
  }

  // Creating the deep copy

  const deepCopy = structuredClone(original);

  // Modifying a deep copy
  deepCopy.address.city = "São Paulo"
  deepCopy.hobbies.push("Running")

  console.log(original.address.city) // Votorantim (Didn't Change)
  console.log(original.hobbies) // [Studying, Training] (Didn't Change)
  

```

Advantages of using `structuredClone()`

. Accepts primitives, objects, arrays, Date, RegExp, Map, Set, and so on
. Able to deal even with circular dependencies (Objects that point to itself)

What it doesn't clone

. Functions (If there is a function inside the object, `structuredClone` throws an error)
. Classes prototypes (returns a plain object, losing the methods of the class)

#### 2. Old and problematic solution: JSON.parse(JSON.stringify()) 

Before `structuredClone`, the  most famous and (classic workaround), was to transform the object in a JSON string and
then parse it back to an object

`const deepCopy = JSON.parse(JSON.stringify(original))`

But, more than a bad performance for big objects, this method loses data

. undefined, functions and symbols (Symbol) are completely ignored/lost
. `Date` type objects become strings
. Values such as `NaN`, `Infinity` become `null`

#### 3. External libraries (lodash)

In case we are working in a project that already uses utility libraries, Lodash has a very robust function called
`cloneDeep`

```js
  import _ from 'lodash'

  const deepCopy = _.cloneDeep(original);
```

This way is excellent and widely used on legacy codes or more complex ecosystems, but if our project is modern, `structuredClone`
most of the times, dismisses the need to install an external library for this.

### When do we really need a Deep Copy?

Not every time we must use a Deep Copy. Creating deep copies consumes more processing and memory, because JS needs to
allocate space for each cloned sub-object

Therefore:

• Use Shallow Copy (...) when: Our objects are plain (flat), in other words, don't have properties that are nested objects
or arrays. It is the ideal standard for React state in simple components (ex. Updating a level 1 property)
• Use Deep Copy when: We need to modify deeply nested data (like a complex config object, a highly hierarchical global
state) and is completely sure that accidental mutations in the internal levels would lead to hard to track bugs.





## Game Board

### Initial GameBoard component explanation

In the GameBoard component, we start by defining a constant, consisting of an array, that has three arrays inside of it.
each of these, will have three items, which is how a tic tac toe board is.

Then, so we don't have to create multiple ol's, li's, we iterate over this game board constant we have just created. The
iteration is as follows:

```html
 <ol id="game-board">
      {initialGameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button>{playerSymbol}</button>
              </li>
            ))}
          </ol> 
        </li>
      ))}
    </ol>
```

This code is doing this

1. The outer <ol> is representing the game board
2. initialGameBoard.map() iterates over the three arrays inside initialGameBoard. Each array representing one row of the
board
1. For each row, a <li> is created containing another <ol>
2. Inside that row, row.map iterates over each element of the row array. Each element represents a cell (or column in
position) on the board
1. For every cell, a <li> with a <button> is rendered, displaying the current player symbol.

### Updating the gameBoard onClick

We could simply do something like

```js
  function handleSelectSquare(rowIndex, colIndex, playerSymbol) {
    setGameBoard(prevGameBoard => {
      prevGameBoard[rowIndex][colIndex] = playerSymbol

      return prevGameBoard

    });
  }
```

We could this, but this approach is not recommended in React. Why? 

Instead just as we should use this state updating function when updating our state based on our previous state, its also
strongly recommended that if our state is an object or array, we update that state in an immutable way. Which simply means
that we create a copy of thar old state and then we just change that copy instead of the existing object/array/

The reason for that recommendation is that if our state is an object or an array, we are dealing with a reference value
in JS, and if we update like that way above, we would be updating the old value in memory immediately even before that
schedule update was executed by React.

This can lead to bugs or side effects if we have multiple places in our application that are scheduling state
updates for the same state.

Mutating state directly does cause unpredictable bugs and hard-to-track side effects when state is shared, but the main
reason React "forbids" this is because of the immutability and re-rendering detection.

So here what we should do is creating a new constant or variable, which is a new array where we can use the spread operator
to paste in all the existing elements of the old array.



## Core Reasons for avoiding direct update change

### 1. The Core React Reason: Reference equality and Re-renders

React determines whether a component needs to re-render by comparing the reference of the old state to the new state using
strict equality (oldState === newState).

. When we do something like `prevGameBoard[rowIndex][colIndex] = "X"`, we are mutating the *existing* array in memory.
. When we `return prevGameBoard`. The reference hasn't changed, React looks at it and thinks: "The state is the exact 
same reference, so nothing changed", and it may skip re-rendering the UI, leaving the screen out of sync with our data.

### 2. The Shared State Reason (The one previously talked about)

. Side Effects: If another component or a custom hook holds a reference to that same `gameBoard` array, changing it in
place means we are mutating data "behind the scenes" without React knowing
. Debugging Nightmare: It violates the principle of predictable state management. It makes features like "Undo/Redo" or
time-travel debugging impossible because history states will point to the same mutated object.

### The Correct (Immutable) Way

To fix this, we must create a shallow copy or deep copy of the array/object before modifying it.

```js
function handleSelectSquare(rowIndex, colIndex) {
  setGameBoard(prevGameBoard => {
    // 1. Create a new copy of the outer array and inner arrays
    const updatedBoard = prevGameBoard.map(innerArray => [...innerArray]);
    
    // 2. Safely mutate the copy
    updatedBoard[rowIndex][colIndex] = 'X';
    
    // 3. Return the new reference
    return updatedBoard;
  });
}
```

By doing this, `updatedBoard` has a brand-new memory reference, telling React: "The state has changed, please re-render
the UI"