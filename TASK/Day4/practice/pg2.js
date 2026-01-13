// From an array of strings, return only those strings whose length is greater than 4
let stringArray = ["apple", "bat", "banana", "cat", "elephant", "dog"];

function filterLongStrings(arr) {  
    let longStrings = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].length > 4) {
            longStrings.push(arr[i]);
        }
    }
    return longStrings;
}
console.log(filterLongStrings(stringArray));