// JavaScript Program to Calculate Weight on Mars
let earthWeight=74;
function calculateWeight(earthWeight){
  return earthWeight * 0.38;
}

console.log("Your weight on Earth is "+earthWeight+" Kg.");
console.log("Your weight on Mars is "+calculateWeight(earthWeight)+" Kg.")