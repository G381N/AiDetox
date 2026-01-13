// Given an array of user objects, return a new array containing only user names in uppercase.
let users = [
    { id: 1, name: "gebin", age: 25 },
    { id: 2, name: "tony", age: 30 },
    { id: 3, name: "banner", age: 35 }
];
function getUppercaseNames(userArray) {
    let uppercaseNames = [];
    for (let i = 0; i < userArray.length; i++) {
        uppercaseNames.push(userArray[i].name.toUpperCase());
    }
    return uppercaseNames;
}
console.log(getUppercaseNames(users));