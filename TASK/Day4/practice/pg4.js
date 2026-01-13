// Given an object with numeric values, calculate the sum of all values.
let numericObject = {
    a: 10,
    b: 20,
    c: 30,
    d: 40
};  
function sumObjectValues(obj) {
    let sum = 0;
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        sum += obj[keys[i]];
    }
    return sum;
}
console.log(sumObjectValues(numericObject));