// This function calculates the energy equivalent of a given mass using Einstein's mass-energy equivalence formula E=mc^2.

function relativityTheory(mass) {
  const speedOfLight = 299792458;
  const energy = mass * (speedOfLight ** 2);
  return energy;
}
const mass = 10;
console.log("The energy for a mass of " + mass + " kg is " + relativityTheory(mass) + " joules.");