// Remove an object from an array based on a matching id value. without =>
let objectArray = [
    { id: 1, name: "America" },
    { id: 2, name: "Brazil" },
    { id: 3, name: "China" },
    { id: 4, name: "Dubai" }
];
function removeObjectById(arr, idToRemove) {
    let newArray = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id !== idToRemove) {
            newArray.push(arr[i]);
        }
    }
    return newArray;
}
console.log(removeObjectById(objectArray, 3));