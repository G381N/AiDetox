// Write a function that checks if a given word is a palindrome (reads the same forwards and backwards).

function isPalindrome(word) {
    const lowerCaseWord = word.toLowerCase();
    const reversedWord = lowerCaseWord.split('').reverse().join('');
    return lowerCaseWord === reversedWord;
}
console.log(isPalindrome("racecar"));   // true
console.log(isPalindrome("madam"));      // true
console.log(isPalindrome("moonlight")); // false
console.log(isPalindrome("aviary"));    // false    
