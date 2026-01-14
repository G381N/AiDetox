// Remove an object from an array based on a matching id value

function removeObjectById(arr, id) {
  return arr.filter(obj => obj.id !== id);
}

let objectsArray = [
  { id: 1, name: "Object 1" },
  { id: 2, name: "Object 2" },
  { id: 3, name: "Object 3" }
];
let updatedArray = removeObjectById(objectsArray, 2);
console.log(updatedArray); 