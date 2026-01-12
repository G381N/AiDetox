// Instructions
// Let's use our newfound knowledge of JavaScript loops to create a program that converts an integer into its equivalent binary number.

// Note: Binary numbers are "base-2", meaning that they are represented by 0s and 1s.

// In a based-numbers.js file, create a program that starts with a myNumber variable, initialized to an integer of your choosing, followed by a binary variable set to an empty string.

// Next, use a loop to go from myNumber down to 0, reducing myNumber by half each time using Math.floor(myNumber / 2).

// In each iteration of the loop:

// Determine the remainder of dividing myNumber by 2 using the % operator.
// If the remainder is 0, the next binary digit is "0".
// If the remainder is 1, the next binary digit is "1".
// Prepend this digit to the binary string (i.e., add it to the beginning of the string).
// Then, update myNumber by dividing it by 2 and rounding down with Math.floor().

// When the loop ends, the binary string will contain the correct binary representation of the original number.

// After you're done, post a screenshot of your code on Twitter by clicking the icon below!