// Challenge: Roll two dice until they show the same number. Count and log the number of rolls it takes to get a match.

let die1 = Math.floor(Math.random() * 6) + 1;
let die2 = Math.floor(Math.random() * 6) + 1;
let numberOfRolls = 0;
while (die1 !== die2) {
    console.log('Roll 1: ' + die1);
    console.log('Roll 2: ' + die2);
    numberOfRolls++;
    die1 = Math.floor(Math.random() * 6) + 1;
    die2 = Math.floor(Math.random() * 6) + 1;
}
console.log('Roll 1: ' + die1);
console.log('Roll 2: ' + die2);
console.log('Number of rolls: ' + numberOfRolls);
