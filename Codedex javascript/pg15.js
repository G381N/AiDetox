// Magic 8-Ball Simulation


let ch = Math.floor(Math.random() * 10);
switch (ch) {
  case 1:
    console.log("Yes - definitely.");
    break;
  case 2:
    console.log("It is decidedly so.");
    break;
  case 3:
      console.log("Without a doubt.");
      break;
  case 4:
      console.log("Reply hazy, try again.");
      break;
  case 5:
      console.log("Ask again later.");
      break;
  case 6:
      console.log("Better not tell you now.");
      break;
  case 7:
      console.log("My sources say no.");
      break;
  case 8:
      console.log("Outlook not so good.");
      break;
  case 9:
      console.log("Very doubtful.");
      break;
  case 10:
    console.log("Very doubtful.");
    break;

  default:
    console.log("Oops looks like something might be broken!!");
}
