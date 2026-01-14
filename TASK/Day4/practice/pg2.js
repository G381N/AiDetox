// From an array of strings, return only those strings whose length is greater than 4
function stringsLongerThanFour(arr) {
  return arr.filter(str => str.length > 4);
}

// Example
stringsLongerThanFour(["apple", "cat", "banana", "dog"]);
// ["apple", "banana"]
