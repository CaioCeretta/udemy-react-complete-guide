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
  "div",
  { id: content },
  React.createElement("p", null, "Hello Word"),
);
```

This would create the same structure/HTML without using JSX.

For that, this `createElement` takes the component type that should be created as the first argument, then takes a props
object with what we might want to pass to that component, and then we can also have child elements as the third argument
so we can control what goes between the opening and closing tag.

### When would this approach be useful?

Different from JSX, this way of coding does not require a build process.

However, it isn't so difficult to create a project that comes with such of a build process. We don't need to write the
code for that process on our own and the JSX approach typically to use and easier to read/understand it. This is because
that non JSX approach is pretty verbose and not necessarily intuitive.

## Why we should return a single element and not multiple sibling ones?

We are able to see that on every component, every component should return a single JSX, with 0 to n children, but it has
to have an outer wrapper, having just the siblings elements doesn't seem to work, but why?

We can understand it in a easier manner by looking other kind of values. Let's take the genRandomInt function as example.
Assume that for whatever reason, instead of returning one number, we want to return more than one. In JS we can't do
this, we must return a single value from a function.

In the JSX case, we need to understand that if we try to return a <Header> component and a <main> element like:

```ts
  return (
    <Header />
    <main>
    </main>
  )
```

With more than one sibling. We need a wrapper so we can technically return one value and internally that value stores
another values. We can think of this as an object or array that wraps these values.

If we return a wrapping div, with no classes, or anything. React will simply add an extra div that would not do anything
different. However, even though this doesn't make a major difference, having extra divs in our DOM simply is unnecessary
and React gives us an alternative, a special "fragment" component, that can be used as a wrapper if we do need a root
component to wrap some sibling components and we don't want to render an actual div on the screen.

We can both use a fragment `<> </>` or use a Fragment component we can import from React

## When should we split components?

When we have a single component, that deals with different responsibilities, it is commonly a sign that we might want to
split it up into multiple smaller sub components with its respective states.

## Passing Object Properties as props with spread syntax.

The spread syntax (`...`) can be used to pass all properties from an object as props to a component.

Example:

```jsx

  const coreConcept = {
    title: "Example",
    img: "example-url",
    description: "Example description"
  }

  <CoreConcept {...coreConcept} />
```

The spread operator expands the object properties into individual props.

The example above is equivalent to:

```js
<CoreConcept
title="Example"
img="example-url"
description="Example description"
>
```

The component receives the properties through its props object

`function CoeConcept({title, img, description}){}`

The objet itself itself won't be passed as a single property but its properties are copied into component props

## ForwardedProps to Wrapped Elements

When we want to maintain a component scalable, and able to accept any sort of props that we may not need to define it as
a prop, we utilize the `...` keyword on the props, and use it like `...props`, or `...rest` or whatever name we want.

We utilize the JS rest and spread operators `...` for prop forwarding. The rest operator collects the remaining props passed
by the parent into a distinct object. By spreading this object onto the JSX opening tag (e.g., <Section {...rest}>), React
automatically applies those key-value pairs attributes to the underlying DOM element. The pattern is ideal for dynamic passing
standard HTML attributes like `id` or `className` to wrapper components.

## Prop Spreading Example

Originally, our TabContent component, receives three properties: `onSelect`, `isSelected`, `children`. Since `onSelect`
is just a custom name we have created, we need to manually connect it with the button tag native onClick event.

```js
// Abordagem inicial
export default function TabButton({ children, isSelected, onSelect }) {
  return (
    <button className={isSelected ? 'active' : ''} onClick={onSelect}>
      {children}
    </button>
  );
}
```

Then the father component can call it this way

```js
<TabButton
  isSelected={selectedTopic === "jsx"}
  onSelect={() => handleSelect("jsx")}
>
  JSX
</TabButton>
```

### Refactoring it with the rest operator

However, if we wish, we can make the component much more cleaner and flexible, by removing the necessity of mapping custom
properties, like onSelect for native events (like `onClick`)

Using the rest operator `...props`, we group any extra property that the component receives and pass it through via spread
directly to the button tag

```js
// New Approach
export default function TabButton({ children, isSelected, ...props }) {
  return (
    <button className={isSelected ? 'active' : ''} {...props}>
      {children}
    </button>
  );
}
```

Attention to the change on the component call

Since `...props` passes through the properties with its exact names to the native HTML, we can no longer use the custom
name `onSelect` on the parent component. 
We have to use the event standard name, which is onClick.

```js
<TabButton
  isSelected={selectedTopic === "jsx"}
  onClick={() => handleSelect("jsx")} // Mudamos de onSelect para onClick
>
  JSX
</TabButton>
```

This way `...props` retrieves the onClick received from the parent and automatically adds it in the button tag, allowing,
in the future, passing other native properties like `disabled`, `id`, and more.