// Given an object with numeric values, calculate the sum of all values.
function sumObjectValues(obj) {
  return Object.values(obj).reduce((sum, val) => sum + val, 0);
}

// Example
sumObjectValues({ a: 10, b: 20, c: 30 });
// 60
