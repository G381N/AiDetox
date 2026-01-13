// Challenge: Write a conditional statement that checks the value of the variable 'day' (1-7) and logs different messages based on the day of the week.


let day = 5;
if (day >= 1 && day <= 4) {
    console.log("Not Friday, yet!");
}
else if (day === 5) {
    console.log("TGIF 🕺");
} else if (day === 6 || day === 7) {
    console.log("Yay, weekends! 🙌");
} else {
    console.log("Wait, what day is it?");
}   