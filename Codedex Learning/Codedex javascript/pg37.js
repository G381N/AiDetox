// Create 3 objects: a pig, a sheep, and a dog. Each object should have properties for name, type, and age.

const pig = {
    name: 'Porky',
    type: 'pig',
    age: 5
}; 
pig.makeSound = function() {
    return console.log( this.name + " is a " + this.age + " year old " + this.type + " that goes oink!");
}
const sheep = {
    name: 'Shawn',
    type: 'sheep',
    age: 3
};
sheep.makeSound = function() {
    return console.log( this.name + " is a " + this.age + " year old " + this.type + " that goes baa!");
}
const dog = {
    name: 'Bucky',
    type: 'dog',
    age: 4
};
dog.makeSound = function() {
    return console.log( this.name + " is a " + this.age + " year old " + this.type + " that goes woof!");
}