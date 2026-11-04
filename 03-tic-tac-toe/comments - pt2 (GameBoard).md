## Game Board

### Initial GameBoard component explanation

In the GameBoard component, we start by defining a constant, consisting of an array, that has three arrays inside of it.
each of these, will have three items, which is how a tic tac toe board is.

Then, so we don't have to create multiple ol's, li's, we iterate over this game board constant we have just created. The
iteration is as follows:

```html
<ol id="game-board">
  {initialGameBoard.map((row, rowIndex) => (
  <li key="{rowIndex}">
    <ol>
      {row.map((playerSymbol, colIndex) => (
      <li key="{colIndex}">
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
3. For each row, a <li> is created containing another <ol>
4. Inside that row, row.map iterates over each element of the row array. Each element represents a cell (or column in
   position) on the board
5. For every cell, a <li> with a <button> is rendered, displaying the current player symbol.

### Updating the gameBoard onClick

We could simply do something like

```js
function handleSelectSquare(rowIndex, colIndex, playerSymbol) {
  setGameBoard((prevGameBoard) => {
    prevGameBoard[rowIndex][colIndex] = playerSymbol;

    return prevGameBoard;
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

## How does a spreading an array in a case like this, where the array is nested, work?

Assume we create the array copy like this: `const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];`

And we know that if we spread over an array, what we get are the elements inside that array.

### 1. What are the values and how they "arrive"?

Consider the following state:

```ts
prevGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
```

This is not a "two-dimensional array" in JS.

It is actually: `[Array, Array, Array]`

Where each element of that array itself is another array

So during:

`prevGameBoard.map(innerArray => [...innerArray])`

The map iterates through the outer array, so for every iteration, the current element is assigned to the innerArray.

#### The first iteration

`innerArray = [null, null, null]

Then [...innerArray] spreads the elements into a new array `[null, null, null]`

At first glance, this looks identical to the original one. However, it's a brand new array with new memory reference.

#### Second iteration

Again [null, null, null]

And [...newArray] creates a new identical array, but with different memory reference

#### Third Iteration

Same thing

#### map end

By the end of the map execution, we will get

```js
[
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
```

Which visually looks exactly like the original structure, but every inner array is a new object in memory.

### 2. How is the spread functioning

Suppose we only copy the outer array

const updatedBoard = [...prevGameBoard];

This creates a new outer array.

However, the nested arrays are still the same ones.

Visually, it would be

```js
prevGameBoard
│
├──► Array A
├──► Array B
└──► Array C

updatedBoard
│
├──► Array A
├──► Array B
└──► Array C
```

Notice that both variables still point to the same inner arrays

Because of that:

`updatedGameBoard[0][0] = "X"`

also changes

`prevGameBoard[0][0]`

Since both references are to the same array, and when we modify any index of the inner array of the outer copy, it will
also reflect on the original outer array.

### 3. What exactly is the map returning?

The callback returns

[...innerArray]

For each iteration

Therefore

prevGameBoard.map(innerArray => [...innerArray])

Is conceptually equivalent to

```javascript
[[...prevGameBoard[0]], [...prevGameBoard[1]], [...prevGameBoard[2]]];
```

Which becomes

```js
[[null, null, null][(null, null, null)][(null, null, null)]];
```

Again the values are identical. The references are not.

### 4. Why does map solves the problem?

Now consider:

```js
const updatedBoard = prevGameBoard.map((innerArray) => [...innerArray]);
```

The outer array is new and every other inner array is also new.

Visually:

prevGameBoard
│
├──► Array A
├──► Array B
└──► Array C

 
updatedBoard
│
├──► Array D
├──► Array E
└──► Array F

And when we do something like

`updatedBoard[0][0] = 'X'`

only 'Array D' changes. Array A remains untouched

### TL;DR

When dealing with nest arrays, copying only the outer array is not enough. Every nested array that might be modified must
also receive a new reference. The map(...) => [...innerArray] pattern is a concise way of creating those new nested references
while keeping the original state untouched

## Core Reasons for avoiding direct update change

### 1. The Core React Reason: Reference equality and Re-renders

React determines whether a component needs to re-render by comparing the reference of the old state to the new state using
strict equality (oldState === newState).

. When we do something like `prevGameBoard[rowIndex][colIndex] = "X"`, we are mutating the _existing_ array in memory.
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
  setGameBoard((prevGameBoard) => {
    // 1. Create a new copy of the outer array and inner arrays
    const updatedBoard = prevGameBoard.map((innerArray) => [...innerArray]);

    // 2. Safely mutate the copy
    updatedBoard[rowIndex][colIndex] = "X";

    // 3. Return the new reference
    return updatedBoard;
  });
}
```

By doing this, `updatedBoard` has a brand-new memory reference, telling React: "The state has changed, please re-render
the UI".

## Lifting State Up

We now have the game board the basic game board we make sure that we actually switch between the two players, so they take
different turns and that we place the symbol of the player that is currently active when the button is pressed.
In addition, it's also good that we highlight the player that is active, with a class, for example.

But this has one important implication, we need to know it both in the player component as well as on the GameBoard component.
Because on the GameBoard we need the symbol of the active player, and on the Player we want to dynamically add a CSS class
to that list item.

But the problem here is that these are two separate components. And how to make sure that both have access to the information
of which players is currently active?

Cases like these that are super common we must "lift the state up"

### What is it?

Lift the state up to the closest ancestor component that has access to all components that need to work with that state.

So instead of managing the information of which players is currently active in the GameBoard or the Player component, which
would not be enough for the reasons mentioned. We need to manage the state in the closest ancestor component

Assume we have a component that holds both components that need the same information. Which in our case, is the App. Because
the app component can then pass the information both to the GameBoard as well as to the Player via props.

So what we will first do is:

Create a state inside the App component, that will handle the active player. And that function will simply be passed as
prop to the GameComponent, and every time a user clicks on a square, that function is fired and toggles the active player.

With that we are switching the active player state and we can now do two things

1. Be able to dynamically highlight a player based on the active player state.
2. Also pass the active player to the gameBoard component, because in the end, the active player is the symbol of the current
   active player, and pass that symbol to that handleSelectSquare function.

Until now, the game is functioning this way.

1. App component, that holds both the players, and the game board, has the activePlayer state that will be shared between
   both components
2. App component has a function to set the current active player, that function utilizes a ternary to check the current
   player symbol and toggle it when a square is clicked on
3. GameBoard's handle select square function, receives the current player (which is essentially its symbol) as a prop, and
   use that symbol to update the clicked square. After clicking and updating the square, it will call the parent's function
   that toggles the active player to alter it.
4. The player component, receives as a prop, the current active player, and dynamically modify its styling.

## Avoid Intersecting State

Before we start working on the winning condition or making sure that the same button can't be clicked multiple times. We
will work on the log that should be displayed below the board.

Because whilst everything might look great right now, we are actually on the edge of writing suboptimal react code,
specially if we plan to add more features.

### Log component and turns state

This component outputs an ordered list about the different turns we had in our game this far, which turns were taken by
each player on that given game.

The GameBoard component holds the current state of the game, and which buttons were pressed, but it does not know when
those buttons were clicked. And we need, for the log, to know the order in which each button took place.

If we would like to create a state of the turns inside the App component, and the current state of the game inside the
gameBoard component, we would have two states that hold basically the same values, and this is something that we, as react
developers, should avoid.

Since both the GameBoard, as well as the Log components need basically the same information about the current state of the
game, it makes sense to remove the state of the current game from the gameBoard component, and start managing it, through
the app, since it is the one component that has access to both the Log and the Board component. Meaning that the most
interesting approach, is to add a gameTurns state to the app component.

Now, what we will see, is that we can manage the information about this different buttons clicks as a list and then
derive both the information we need for the Log as well as the information we need to the GameBoard from the array of
gameTurns.

Therefore, in the gameBoard component we can get rid of the activePlayerSymbol prop and we use the onSelectSquare prop as
a value for the onClick button, so we no longer go into managing the game state in that component, and instead, lift it
up.

Now we need to fix the GameBoard component, so it continues working as expected. The handleSelectSquare is the function we
are passing as a prop from App to GameBoard onclick, but now, instead of just modifying the current player state, we also
will like to update the turns state, by adding new values to the GameTurns array.

The schema of the every turns array that will be added to that array is basically, two nested objects, one is which player
clicked on the button and the other is one holding in which row it was in, and the column, so that item will be the object.
Every new object is going to be placed before the current turns object, so the log will show the latest to the oldest move.

## Prefer computed values & avoid unnecessary state management.

The activePlayer state is not an independent info. It depends explicitly of the match history, and based on the GameTurns
state, we can define the currentPlayer just by looking at the plays that were made, and currentPlayer state wouldn't have
to exist.

The fewer state we have, the lower is the risk of inconsistencies. We could think of keeping that currentPlayer state and
adding that value to the GameTurns's state, but the GameTurns state should store the current state of the game, and we
would'nt be able to make sure that the activePlayer state is consistent to the GameTurns state.

Therefore, we should create a new variable inside the `setGameTurns()` setter, check the the last player to move, and
assign the opposite to that variable. But here is a caveat, the prevTurns array may be 0, and it would lead
to an error when we try to create our condition of the prevTurns[0].player, since it would not exist. So we will also have
to check if the length is greater than 0


## Using App's gameTurns state in the GameBoard component

Now that we are handling everything inside the App component and passing it down to its children, this is how we are going
to reflect the board based on that state

The gameTurns state holds every move that occurs inside the board. Which square was clicked on, its row and column, as well
as which player did it.

The GameBoard component will receive that turns as property and will do the following

1. If there were no moves yet. It renders an empty board with all the values as null

2. If a player has already clicked on it. It will do the following

We will loop over our turns and inside that loop, we will extract the information about the turn that occurred from that
object that we are storing. Every object that is inside the turns array is something like this: 
{square: {row: 1, col: 1}, player: "X"}
 

## Sharing State Across Components

We can start by the `Log` component. Which is a component that receives the gameTurns being made.

First we modify that component to accept a `turns` prop, and then map over this turns prop to a list of items. The `Log`
components will return an ol with the player and the coordinates where it clicked on. Not forgetting the key attribute for
dynamic lists, and it could be the row/col since it could be selected just once per game.

We can notice that we don't need to manage any state inside the Log component, instead what we are doing here is called
*deriving* state. We are making use of the gameBoard constant, which is a computed value derived from some state, in this
case, from the gameTurns state that is managed in the App component.

We are deriving the `gameBoard` from that state and this is how we should think and work with React. To manage as little
state as needed and try to derive as much information and as many values from that state.

## Reducing state management and identifying unnecessary state

We just made sure that we compute that gameBoard value based on the `gameTurns` state that it receives as props from the
App component.

But before including new features, let's take a look in that `App` component

Is there anything else we can compute in there? Maybe something we are currently managing as state?

And the answer is yes, even though we are setting the `currentPlayer` state. The player needs to change after every turn
and we need to update the UI, such as highlighting the current active player and the updating the symbol that will be placed
on the boxes. Making us think that managing that in a state would be the best option, but it is not.

Because yes, we need state to trigger an UI update, but let's not forget that we have that `gameTurns` state that already
changes the player whenever a box is selected. So we definitely don't need that player to manage that currentPlayer state
just to trigger a ui update when that happens.

We might think: Ok, but we need the information about the current/last player, but we already have access to that information
based on the previous turn of the gameTurns state. 

That means that instead of having a dedicated player state, we can add some derived state. We can start by copying the logic
inside the handleSelectSquare and place it outside the function. The difference will be that inside the `App` component
we are not getting the currentPlayer information based on some old gameTurn state, but instead using the current `gameTurns`
state. With that, we are then deriving the symbol of the currently active player from gameTurns.

### Why do we have both functions instead of just one?

Even though the code is pretty similar, this was made for a reason related to the asynchronous functioning of a React's
setState.
 
### 1. Outside the `setGameTurns` (Derived for rendering)

```javascript
  let currentPlayer = X;
  if(gameTurns.length > 0 && gameTurns[0].player === "X") currentPlayer = "O";
```

° For what it is used: In each component rendering, React needs to know who is the player to play to *show on the screen*
(For example: "Now it's X's player turn") or to style the board

° How does it work: This variable is directly recalculated based on the current `gameTurn` state. Since React re-renders
the component every time the state changes, this variable is always in sync with the shown visual UI the player is seeing.

### 2. Inside of `setGameTurns` (Based on the setter previous state)

```js

  setGameTurns((prevTurns) => {
    let currentPlayer = X;
    if(prevTurns.length > 0 && prevTurns[0].player === "X") currentPlayer = "O";
  })
```

° For what it is used: To ensure data consistency when the state is synchronously updated

° The problem it avoids (Stale State / Race Condition):  In React, state updates can be scheduled or happen in bulks. If
the user clicks too fast on two squares in a row, the globaL `gameTurns` variable can not be updated yet when the second
click is processed.
By using the callback function `(prevTurns) => {...}`, we will ensure that we are retrieving the most recent and real of
the exact moment this update will happen, avoiding that two turns on a row remain as the same player.

### Practical Summary

Outside the Setter - Component's Scope - Main objective is to control the visual UI
Inside the Setter - Callback function - Ensure the logic's integrity and avoid outdated state when processing plays.

Therefore, outside the setter is for the user presentation and inside holds how the data is calculated under the hood.

## Back to Tic-Tac-Toe Game

So now we have both the activePlayer inside the gameTurns setter, based on the previous state, and the activePlayer outside
the setter and based on the current state.

However, we can't get rid of the variable inside the gameTurns setter, because it reflects the most "fresh" state update.

But one thing we can do is to create a function outside of the function, where it does'nt need access to the state or any
other data related to the component and it also should not be created when the component function is executed, where it 
will receive the gameTurns as property and derive the current active player from it. We can also make use of that function
inside the setter and it will work continue working as usual.
