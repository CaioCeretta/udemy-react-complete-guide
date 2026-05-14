## As we seen on the file, we must remember: 

### The syntax is identical, but the behavior inverts depending on the side of where it is used.
 
### Examples: 

1. We can assign an alias when destructuring an object by adding a colon and to the right side of the  colon, the name we
want to rename the property to

When using the curly braces on the left side of the equal sign, when destructuring. The colon is used for separating the
property that is pulled out of that object, from the alias name that we are assigning to it

2. When crating an object, by using the curly braces on the right side of the equal sign, the colon is used to separate the
key/property name from the value that is stored under that property

3. Default values with alias (destructuing)

A common error is to forget how to combine renaming with a default value (in case the property does not exist). The correct
order is `originalName: newName = defaultValue`.

For example

```js
const user = { name: "Caio" };

// Pulls of age (that does not exist), names it to userAge and defines 25 as the default value

const { age: userAge = 25 } = user;

console.log(userAge) // 25
```

4. The destructuring can also be used in function parameter lists.

For example, if a function accepts a parameter that will contain an object it can be destructured to "pull out" the
object properties and make them available as locally scoped variabls (i.e, variables only available inside the function
body).

For example

function storeOrder(order) {
  localStorage.setItem('id', order.id);
  localStorage.setItem('currency', order.currency);
}

Insted of accessing the order properties via "dot notation" inside the `storeOrder function body, we could use destructuring
like this

function storeOrder({id, currency}) { //destructuring
  localStorage.setItem('id', id);
  localStorage.setItem('currency', currency);
}

This destructuring syntax is the same as taught in the lecture - just without creating a constant or variable manually.

Instead, `id` and `currency` are "pulled out" of the incoming object (the object being passed as argument to the function).

Is important to understand that in this case, storeOrder still only takes one parameter in this example. It does not accept
two parameters. Instead, it's one single parameter - an object which then just is destreuctured internally. the function
would still be called like

storeOrder({id: 5, curency: "USD", amount: 15.99}) // one argument value

