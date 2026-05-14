/* const hobbies = ["Sports", "Cooking", "Reading"];
console.log(hobbies[0])

hobbies.push("Working");

/* The findIndex iterates over an array, and for each item, it becomes the argument and we can use which we can use in
order to check if that item is equal to the condition we define in that function, if so, returns the index. In case no item
meet the condition we define. It returns -1  
const index = hobbies.findIndex((item) => {
  return item === "Reading";
});

// console.log(index);

/*  Map simply iterates over an array, and for each value, we define to what that value must be transformed to. And at the
end, it returns us a new array, with all the transformed values 
const exclamation = hobbies.map((item) => item + "!");

// console.log(exclamation);

# Destructuring

const userNameData = ["Caio", "Ceretta"];

//const firstName = user[0];
//const lastName = user[1];

// In this case the variable names are up to us, since we are just defining them by position
// const [firstName, lastName] = userNameData;

const user = {
  name: "Caio",
  age: 30,
};

// const name = user.name;
// const age = user.age;

// Objects in other hand, the constants must have the same name as the properties
const { name, age } = user;

// or even

const { name2, age2 } = {
  name2: "Caio",
  age2: 30,
};

console.log(name2, age2);

// We could also assign aliases to define a constant based on a property, but changing its name, like

 const { name: firstName, age: age3 } = user;

*/

// Another crucial concept related to arrays and objects is the special spread operator

const hobbies = ["Sports", "Gaming"];

const user = {
  name: "Caio",
  age: 30,
};

const hobbies2 = ["Training", "Studying"];

// assume we want to merge both of these objects, we would do it with the spread (...) notation

// assume that we would try to merge without spreading the values, just merging the arrays, like

const erroneousMerge = [hobbies, hobbies2];

// This would not merge the arrays, it would create an outer array, and inside this outer array, the two hobbies array,
// which is not what we want to do

console.log(erroneousMerge);

const mergedHobbies = [...hobbies, ...hobbies2];

console.log(mergedHobbies);

/* The spread operator basically pulls out the values of an array, and add them as values separated by comma into another
array */

/* We could also use the spread operator on objects, for example */

const extendedUserObject = {
  ...user,
  isAdmin: true,
};

console.log(extendedUserObject);

/* The spread operator on an object, will "spread" all the properties: values of the object inside the new one */
