// Create departTripTicket object and returnTripTicket object with properties and methods

const departTripTicket = {
    name: 'John Doe',
    from: 'New York',
    to: 'London',
    businessClass: false,
    leaveTime: 10,
    arriveTime: 22,
}

const returnTripTicket = {
    name: 'John Doe',
    from: 'London',
    to: 'New York',
    businessClass: true,
    leaveTime: 14,    
    arriveTime: 2,
}

departTripTicket.upgrade = function() {
    if (this.businessClass) {
        console.log("Your ticket is already business class!");
    } else {
        this.businessClass = true;
    }
}

departTripTicket.flightTime = function() {
    let time = this.arriveTime - this.leaveTime;
    if (time < 0) {
        time += 24; // Adjust for overnight flights
    }
    console.log("Flight time is " + time + " hours.");
}   

   
returnTripTicket.upgrade = function() {
    if (this.businessClass) {
        console.log("Your ticket is already business class!");
    } else {
        this.businessClass = true;
    }
}
returnTripTicket.flightTime = function() {
    let time = this.arriveTime - this.leaveTime;    
    if (time < 0) {
        time += 24; // Adjust for overnight flights
    }
    console.log("Flight time is " + time + " hours.");
}

// Use the upgrade method on departTripTicket
departTripTicket.upgrade();
returnTripTicket.upgrade();

// Log both objects to the console
console.log(departTripTicket);
console.log(returnTripTicket);