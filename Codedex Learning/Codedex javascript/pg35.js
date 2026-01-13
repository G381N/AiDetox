// Create an empty object named car.

const car = { };
car.model = "Honda";
car.year = 2024;
car.color = "white";
car.used = true;
if (car.used) {
    console.log(`I'm looking for a ${car.color} ${car.year} ${car.model} that is used.`);
} else {
    console.log(`I'm looking for a ${car.color} ${car.year} ${car.model} that is new.`);
}
