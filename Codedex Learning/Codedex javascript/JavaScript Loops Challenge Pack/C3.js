// Instructions
// When you multiply a number by itself three times, you're cubing it (example: 3³ = 3 x 3 x 3 = 27).

// Write a program that finds the total of all the cubed odd numbers between 1 and limit.

// For example, if limit is 7, the total should be 343:

// 1 
// 3
//  +3 
// 3
//  +5 
// 3
//  +7 
// 3
 
// =1+27+125+343
// =496
// Define a limit variable with a number value like 7. Then, define a total with an initial value of 0.

// Use a for loop to iterate from 1 up to the limit and do the following each time:

// Cube only the odd numbers (1, 3, 5, etc.).
// Add each cubed number to your total.
// Note: If the limit itself is odd, cube it too.

// Finally, log the total to the console.

let limit = 7;
let total = 0;
for (let i = 1; i <= limit; i += 2) {
    total += i ** 3;
}
console.log(total);
