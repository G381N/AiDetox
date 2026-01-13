//Guess My Lucky Number Game

const LuckyNumber=6;
let guess= Math.floor(Math.random()*10)+1;
while(guess!==LuckyNumber)
{
  console.log("Nope, it isn't "+guess);
  guess= Math.floor(Math.random()*10)+1;
}
console.log("My lucky number is "+LuckyNumber); 
