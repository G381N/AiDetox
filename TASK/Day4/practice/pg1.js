//Write a function that removes duplicate values from an array. without using set.

function removeDuplicates(arr) {
  return [...new Set(arr)];
}

// Example
removeDuplicates([1, 2, 2, 3, 4, 4]); 
// [1, 2, 3, 4]
