/* const hobbies = ["Sports", "Cooking", "Reading"];
console.log(hobbies[0])

hobbies.push("Working");

/* The findIndex iterates over an array, and for each item, it becomes the argument and we can use which we can use in
order to check if that item is equal to the condition we define in that function, if so, returns the index. In case no item
meet the condition we define. It returns -1
const index = hobbies.findIndex((item) => {
  return item === "Reading";
});

console.log(index);

/*  Map simply iterates over an array, and for each value, we define to what that value must be transformed to. And at the
end, it returns us a new array, with all the transformed values
const exclamation = hobbies.map((item) => item + "!");

console.log(exclamation);

# Destructuring

const userNameData = ["Caio", "Ceretta"];

const firstName = user[0];
const lastName = user[1];

In this case the variable names are up to us, since we are just defining them by position
const [firstName, lastName] = userNameData;

const user = {
  name: "Caio",
  age: 30,
};

const name = user.name;
const age = user.age;

Objects in other hand, the constants must have the same name as the properties
const { name, age } = user;

or even

const { name2, age2 } = {
  name2: "Caio",
  age2: 30,
};

console.log(name2, age2);

We could also assign aliases to define a constant based on a property, but changing its name, like

 const { name: firstName, age: age3 } = user;



Another crucial concept related to arrays and objects is the special spread operator

const hobbies = ["Sports", "Gaming"];

const user = {
  name: "Caio",
  age: 30,
};

const hobbies2 = ["Training", "Studying"];

assume we want to merge both of these objects, we would do it with the spread (...) notation

assume that we would try to merge without spreading the values, just merging the arrays, like

const erroneousMerge = [hobbies, hobbies2];

This would not merge the arrays, it would create an outer array, and inside this outer array, the two hobbies array,
which is not what we want to do

console.log(erroneousMerge);

const mergedHobbies = [...hobbies, ...hobbies2];

console.log(mergedHobbies);

The spread operator basically pulls out the values of an array, and add them as values separated by comma into another
array 

 We could also use the spread operator on objects, for example 

const extendedUserObject = {
  ...user,
  isAdmin: true,
};

console.log(extendedUserObject);

 The spread operator on an object, will "spread" all the properties: values of the object inside the new one 

const hobbies = ["Training", "Gaming"];

// for of loop, basically creates a new hobby constant, for every item inside of hobbies array
for (const hobby of hobbies) {
  console.log(hobby);
}

/*  for in is used to iterate over the properties of an object. It returns every key inside rthe user object, not the
value, in case we want the value, we would need to use `user[property]`, where property is each property being iterated

const user = {
  name: "Caio",
  age: 30,
};

for (property in user) {
  console.log(`The value of the property ${property} is ${user[property]}`);
}
*/

/* Functions as values

For example, we can set a timr with help of the built-in setTimeout, a function that is provided by the browser

setTimeout receives two parameters, the first input value it wants is a function itself, a function that can be defined
with the function keyword, or as an error function.

What is important to understand is that the `() => {}` input is creating a new anonymous function. We could also create the
function manually beforehand and simply pass it as argument
*/

function handleTimeout() {
  console.log('Timed out');
}

// Remember, arrow functions are stored in variables, because arrow functions never accept a name in front of them, they
// always are created in an anonymous way

const handleTimeoutArrow = () => {
  console.log('Timed out... Again')
}

 
 

setTimeout(handleTimeout, 3000)