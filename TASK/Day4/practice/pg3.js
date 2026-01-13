// Write a function that checks whether a given key exists in an object.
let sampleObject = {
    name: "John",
    age: 30,
    city: "New York"
};
function keyExists(obj, key) {
    return obj.hasOwnProperty(key);
}   
console.log(keyExists(sampleObject, "age"));  
console.log(keyExists(sampleObject, "country"));  