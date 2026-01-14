// Update a specific object property inside an array without mutating the original array.
let usersArray = [
    { id: 1, name: "gebin", age: 25 },
    { id: 2, name: "tony", age: 30 },
    { id: 3, name: "banner", age: 35 }
];

function updateUserNameById(arr, id, newName) {
    return arr.map(user => 
        user.id === id ? { ...user, name: newName } : user
    );
}
let updatedUsers = updateUserNameById(usersArray, 2, "stark");
console.log(updatedUsers);