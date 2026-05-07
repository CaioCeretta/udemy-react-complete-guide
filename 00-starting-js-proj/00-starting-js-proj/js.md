## Import / Export

It is considered a best practice to split our code across multiple files to keep it maintainable and manageable. Which is
exactly what we do with help of import and export keywords.

In case we are working with only js, we need to inform the extension of the files, such as "./utils.js". When working in
React projects, the extension is omitted from there, and that is because of the build process that adds the extension
behind the scenes.

Even though it is crucial to add type="module" in the scripts, in React we won't see the generated scripts with this
type=module attribute. The reason for that is that the build process will actually take our imports and exports and
merge all these separate files we have during development into one or more big files, which are then imported with the
"old school" syntax in the right order. One of the reasons for this process is that some browsers may not natively
support that given syntax.

### Different types of export

We can, other than `export let apiKey = 'dasdsa'`. To directly export the values as default like
`export default "dasdsa'. Because default exports can be of whatever name we like. So we just need to import it with the
name we desire from the path. Or, create a constant with the variable we want to export and at the end export default the
constant. However, when importing, we don't have to import default exports in curly braces, like we should on named
exports.

We can also group all the exported values from a file using `* as anyName from "example.js`. The as will be used to define
the alias and after that, Then, every exported variable or function from the example.js are going to be a property of the
anyName object, and will be accessed like`anyName.exampleVariable` 

## Functions in JSX

The react syntax we use in jsx elements, is basically defining an anonymous arrow function. This is made by simply defining
a function in the place where it is needed like: onClick={() => alert("blablabla")}

There are mainly three ways of using functions in JSX elements

1. Anonymous Function (inline) - 

Using onClick={() => ...} creates a new function on every render.

**When to use it**: It’s great for quick logic or when we need to utilize variables that change during different renders
(like an ID in a list).

**Caveat**: While modern engines are fast, doing this excessively in a huge list of components can occasionally cause
performance problems since the child component sees a "new" prop every time

2. Passing By Reference (External)

This is the "clean" way to do it. Passing onClick={handleButtonClick} sends the function definition without executing it.

**Parameters**: if we need to pass an argument, we must wrap it: onClick={() => functionName(arg)}.

**Caveat**: If we accidentally write onClick={functionName(functionArg)}, the function runs immediately during render, which
usually leads to the "Too many re-renders" error if that function updates state.

3. **Immediate Execution**
   
Writing onClick={functionName()} (with the parentheses) executes the function the moment React evaluates that line of code.

**Is it common?** Almost never for event handlers.

**When is it used?** Sometimes we will see this pattern if a function returns another function (currying). Like:

```js
const createHandler = (id) => () => console.log(id);

// This is valid because createHandler returns a function
<button onClick={createHandler(5)} />
```