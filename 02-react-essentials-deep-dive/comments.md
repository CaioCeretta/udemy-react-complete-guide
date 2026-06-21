## Build Process

We start by writing React code, then, the server during the build, changes & optimizes our code, and transforms it such
that it runs on the browser. Also (potentially) optimizes other assets like CSS & image files.

The build process generate a collection of files that include our optimized code and any other extra assets (e.g., CSS
code files, optimized images, etc).

## We technically don't need JSX, but it is convenient

As a react developer, we should know that in theory, we also can create react apps without JSX.Which would then mean that
we could avoid the build process, but the vast majority of React projects will use the JSX code and a build process that
transforms it.

This means that we could replace a JSX code like

```ts
  <div id="content">
    <p> Hello Word </p>
  </div>
```

with 

```ts
  React.createElement(
    'div',
    {id: content},
    React.createElement(
      'p',
      null,
      'Hello Word'
    )
  )
```

This would create the same structure/HTML without using JSX.

For that, this `createElement` takes the component type that should be created as the first argument, then takes a props
object with what we might want to pass to that component, and then we can also have child elements as the third argument
so we can control what goes between the opening and closing tag.

### When would this approach be useful? 

Different from JSX, this way of coding does not require a build process.

However, it isn't so difficult to create a project that comes with such of a build process. We don't need to write the
code for that process on our own and the JSX approach typically to use and easier to read/understand it. This is because
that non JSX approach is pretty verbose and not  necessarily intuitive.
 




