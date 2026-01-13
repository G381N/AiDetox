// Update a specific object property inside an array without mutating the original array.
let usersArray = [
    { id: 1, name: "gebin", age: 25 },
    { id: 2, name: "tony", age: 30 },
    { id: 3, name: "banner", age: 35 }
];
function updateUserAge(arr, userId, newAge) {
    let updatedArray = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === userId) {
            let updatedUser = {
                id: arr[i].id,
                name: arr[i].name,
                age: newAge
            };
            updatedArray.push(updatedUser);
        } else {
            updatedArray.push(arr[i]);
        }
    }
    return updatedArray;
}
console.log(updateUserAge(usersArray, 2, 31));
console.log(usersArray);