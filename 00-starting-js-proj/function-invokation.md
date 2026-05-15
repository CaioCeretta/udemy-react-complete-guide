
## Function passed by reference

What is important to understand is that when we are passing a function to another function, we usually pass it as reference,
 omiting the parentheses. e.g.

 `setTimeout(referenceFunc, 3000)`

## Function execution

 By adding parentheses to that function, it would be executed as soon as it is loaded in the screen. 

 e.g. `setTimeout(function(), 3000)`

### When we use it like this?

Although most of the times that we deal with onClick events, we want to avoid direct execution, there are specific scenarios
where running the function right away is exactly what we need. Examples

1. Functions that return other functions, like closures

This is the most elegant and technical manner. We execute an external function to configure something and it "returns" us
a new personalized function to be used later

Example: Imagine we want to create buttons with different colors

```js
const createLog = (color) => {
  return () => console.log(`$c Colored Log`, `color: ${color}`);
};

// Here, we execute it now so that onClick receives the function with the color already "baked in"
<button onClick={createLog('blue')}> Blue Log <button/>
<button onClick={createLog('Red')}> Red Log <button/>
```

2. State initialization

In frameworks like React, if we have a heavy calculation or need to read from `localStorage` to set an initial value, we
want that function to run immediately - but once

Example:

```js
const [value, setValue] = useState(() => {
  const saved = localStorage.getItem('my-data')\
  return saved ? JSON.parse(saved) : 0;
})
```

3. IIFE (Immediately Invoked Function Expression)
   
Sometimes we want to run a setup script or isolate variables as soon as the b rowser reads the file, without needing to
call it later.

Example:

```js
(function() {
  //Run as soon as the script loads
  console.log("Configuring telemtry system...")
  connectToServer()
})();
```

### When to avoid it

The most common error happens during UI rendering, if we put `renderList()` with parentheses inside a component body without
a wrapper, we might trigger an infinite loop

1. The component loads
2. the function executes immediately
3. the function updates the state
4. the state change forces the component to re-render
5. The component re-renders and... starts again at step 1.


```js
function userProfile() {
  const [count, setCount] = useState(0);

  const updateViewCount = () => {
    setCount(count + 1);
  }

  //  WRONG: Executing immediately
  // This runs, updates state, triggers re-render, runs again... INFINITE LOOP
  updateViewCount();

  return (
    <div>
      <h1> Profile views: {count} </h1>
      {/* Bad: This executes as soon as the button is rendered, not when clicked*/}
      <button onClick={updateViewCount()}>Refresh (Broken)</button>
    </div>
  )

}
