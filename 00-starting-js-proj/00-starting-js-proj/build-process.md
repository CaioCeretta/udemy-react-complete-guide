## Build Process

When working on react apps, we will almost never add the `script` tag in our projects on our own, because React apps use
a build process which injects the script tags in the html code for us

### Why? 

In our react projects, we usually see an index.html, with a div of id `root`, and nothing else. No script tags, only meta
and link tags.

This happens because of the build process, which simply means: "The code we write is not the code that gets executed in
the browser, but transfroemd before it's handed off to it. 

This is done by a tool that is running in the background, the `react-scripts`,, that provides a bunch of tools that take
our code, transforms it behind the scenes, and then injects it into the browser, or to be precise, before it is injected
with a help of a script tag in the html file.

### Inspecting

If on a running app, we inspect the file. We will see that now there is a bunch of script tags in there. Which were generated
and injected automatically behind the scenes by the build process.

### Why does a React code needs to be transformed by the build process?

1. Raw, unprocessed code won't execute in the browser. React code uses a special feature named JSX, which is not understood
by the browser. To use it, it needs to be transformed into something JS knows before the code is executed in the browser.

2. The code we write, would not be optimized for production, it would not be minified. Minifications are used so variable
names or functions are shortened to reduce the amount of js code that is served to the user.

