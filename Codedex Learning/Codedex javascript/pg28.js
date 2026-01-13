// Generate a random DNA sequence consisting of 24 strands, each strand made up of 3 random pieces from the set ["A", "C", "G", "T"].

const dnaPieces = ["A", "C", "G", "T"];
const myDNA = [];
for (let i = 0; i < 24; i++) {
  let strand = "";
    for (let j = 0; j < 3; j++) {
        const randomIndex = Math.floor(Math.random() * dnaPieces.length);
        strand += dnaPieces[randomIndex];
    }
    myDNA.push(strand);
}
console.log(myDNA);