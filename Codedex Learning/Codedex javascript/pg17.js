// Simple Rock-Paper-Scissors Game


// 0 = Rock, 1 = Paper, 2 = Scissors
let player = 0; 
let computer = Math.floor(Math.random() * 3); 

const choices = ['Rock', 'Paper', 'Scissors'];

console.log('Player picked:     ' + choices[player]);
console.log('Computer picked:   ' + choices[computer]);

if (player === computer) {
	console.log('It\'s a tie!');
} else {
	const outcome = (player - computer + 3) % 3;
	if (outcome === 1) {
		console.log('The player won!');
	} else {
		console.log('The computer won!');
	}
}