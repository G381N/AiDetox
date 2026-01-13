// Modify the musicPlaylist array as per the instructions

const musicPlaylist = [
  "Tom Sawyer",
  "Sabotage",
    "I Wanna Dance With Somebody",
  "Don't Speak",
  "Bulls On Parade",
    "Thriller",
    "The Breaks",
    "Brick",
    "Aeroplane Over the Sea",
    "Tubthumping"
];
musicPlaylist.shift();// Remove the first song
musicPlaylist.pop();// Remove the last song
musicPlaylist.push("Imagine");// Add "Imagine" to the end of the playlist
musicPlaylist.unshift("Bohemian Rhapsody", "Hotel California");// Add "Bohemian Rhapsody" and "Hotel California" to the beginning of the playlist
console.log(musicPlaylist);// Print the modified playlist