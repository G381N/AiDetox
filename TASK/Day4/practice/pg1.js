//Write a function that removes duplicate values from an array. without using set.

let arrayWithDuplicates = [1, 2, 2, 3, 4, 4, 5];

function removeDuplicates(arr) {
    let uniqueArray = [];
    for (let i = 0; i < arr.length; i++) {
        if (!uniqueArray.includes(arr[i])) {
            uniqueArray.push(arr[i]);
        }
    }
    return uniqueArray;
}   
console.log(removeDuplicates(arrayWithDuplicates));

