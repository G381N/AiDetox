// Converting a Decimal Number to Binary Representation
let myNumber = 13; 
binary = '';
while (myNumber > 0) {
    let remainder = myNumber % 2;
    binary = remainder.toString() + binary;
    myNumber = Math.floor(myNumber / 2);
}   
console.log(binary); // Output the binary representation