## Basic Comments

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
is being used as value/argument for the createRoot function that is being called.




