const hobbies = ["Sports", "Cooking", "Reading"];
// console.log(hobbies[0])

hobbies.push("Working");

/* The findIndex iterates over an array, and for each item, it becomes the argument and we can use which we can use in
order to check if that item is equal to the condition we define in that function, if so, returns the index. In case no item
meet the condition we define. It returns -1  */
const index = hobbies.findIndex((item) => {
  return item === "Reading";
});

// console.log(index);

/*  Map simply iterates over an array, and for each value, we define to what that value must be transformed to. And at the
end, it returns us a new array, with all the transformed values */
const exclamation = hobbies.map((item) => item + "!");

// console.log(exclamation);
