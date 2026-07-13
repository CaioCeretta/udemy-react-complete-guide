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
  onClick={() => handleSelect("jsx")} // We've changed onSelect to onClick in order to use the native property when using
  // the ...rest operator
>
  JSX
</TabButton>
```

This way `...props` retrieves the onClick received from the parent and automatically adds it in the button tag, allowing,
in the future, passing other native properties like `disabled`, `id`, and more.

## This means that we can't use non native properties when spreading? 

The answer is yes, a golden rule and bast practice when working with reusable components in React is that we have to separate
what is customized in named properties and what is native to the HTML inside ...props. This is excellent, because it prevents
other developers to "stain" the HTML with invalid attributes.

So basically

*Custom Properties*: They must be individually destructured and treated as named properties in the component's arguments
*Native Properties*: These ones can be left for the rest operator, because the HTML will automatically spread them.

## Component return

React components doesn't have a fixed "type" like div or fragment, it just needs to return **a single React element**.

For example, we usually may create components, like a Card component that returns a div that wraps other elements, or fragments.

In those cases, the root element happens to be a <div> or <>. But it could just as well be an `<input>`;

```js
function EmailInput() {
  return <input type="email" />
}
```

or textareas, or even other custom components. If we have something as

```js
function TextField({ multiline }) {
  return multiline ? <textarea /> : <input />
}
```

When react renders `TextField`, it will end up rendering an input or textarea. Not needing to be exactly a wrapper.

## More refactoring Tips

We already have the Section component to reutilize where we were wrapping divs with titles, ids, and more

Now, we must look at one general case we may face. We have, inside the Examples.jsx, we can see that each TabButton is a
combination of having a menu bar with tab buttons, and then the tab content below that menu bar.

There is nothing wrong with this, it is working just fine. But in bigger apps it would not be unreasonable to assume that
we might have different places in the app where tabs like these might be used. And it would be interesting to make this
dynamic, and this means that we might want a reusable Tabs component

A tab consist of a menu and the content beneath it. Let's take a look at a possible flow of thinking:

Our Examples component renders a set of TabButtons based and based on the selected item, it will render the content based
on that key.

We can define a new Tabs component which will be created to be a reusable abstraction for any interface based on tabs.
Its objective is to provide visual structure and component interaction, without knowing details of the business logic or
application data.

It had some thought processes which consisted of

### Who must be responsible for each information?

The answer was separating the responsibilities between the parent component and the Tabs component

### Responsibilities of the parent

The parent component is responsible for all the application logic. It knows

• Which tabs will exist
• Which one is the selected tab
• What should happen when a tab is selected
• How the content of each tab is built

It is the parent who decides. For example, if the content will be a text, a form, a table, a graph or any other type of
React component. After building this content, it sends it to the Tabs via prop

### Tabs responsibilities

Tabs is responsible for presentation and interaction with the tabs interface. It:

• Receives the list of tabs;
• Renders a TabButton for each one of them
• Visually identifies which tab is selected
• Notifies the parent component when a tab is clicked
• Renders the received content

It is important to notice that Tabs does not know the content structure that is being rendered. It only receives a React
element and position it inside its structure. This means that it does not know if it is displaying a simple paragraph, a
list of products, a form, an image gallery or any other component.

This decision makes the `Tabs` independent of the app business rule. Since it does not have any knowledge of the data, nor
the way that the content is built, the same component can be reused in different contexts without the need of modifications.

This abstraction follows the "separation of responsibilities" principle: the parent component controls the data, the state
and the application logic, while the component Tabs is responsible for organizing the interface, managing the tabs interaction
and displaying the content which has been provided to it — tabs render the content, but does not produce it.






