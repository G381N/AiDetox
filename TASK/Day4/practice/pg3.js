// Write a function that checks whether a given key exists in an object.
function hasKey(obj, key) {
  return obj.hasOwnProperty(key);
}

// Example
hasKey({ name: "Gebin", age: 22 }, "age"); 
// true
