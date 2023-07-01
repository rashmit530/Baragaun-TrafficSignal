/*
Write a simple traffic light simulation using JavaScript and the 'config' variable below.

The traffic light controls an intersection with multiple streets, see 'config.streetNames'. Only
one street is given green light at any given time. This street lets
'config.numberOfCarsPassThroughIntersectionPerSecond' cars pass through the intersection.

For the switching green, these rules apply in declining priority:

1. Rule: Each green phase has to be at least 'config.minGreenDurationInMilliSeconds' long, unless there are
         no cars going through the green light.
2. Rule: When a street has waited 'config.maxWaitForGreenInMilliSeconds' or longer it should receive green.
3. Rule: When a street has 'config.carsForGreen' or more cars waiting it should receive green.
4. Rule: When all cars have passed through green, the street that has waited the longest and has cars queued
         should receive green.

A function 'addCar(streetIndex)' is used to queue cars at the intersection. The function is called from
somewhere else outside this scope.

You can assume no thread related issues.
*/
var config = {
  minGreenDurationInMilliSeconds: 10000, // a green phase must be at least this long
  numberOfCarsPassThroughIntersectionPerSecond: 1, // every second this many cars go through the green light
  maxWaitForGreenInMilliSeconds: 30000, // if a street waited this long or longer, it should receive green
  carsForGreen: 3, // number of cars that will give a street priority for the next green
  streetNames: ["A", "B", "C"],
};
function startTrafficSignal(streetCarDetails) {
  console.log("streetCarDetails " + streetCarDetails);
  setTimeout(function () {
    var green = document.getElementById("green");
    var yellow = document.getElementById("yellow");
    var red = document.getElementById("red");

    var sortedByCars = Array.from(streetCarDetails.keys()).sort(
      (a, b) => streetCarDetails[b] - streetCarDetails[a]
    );

    console.log("sortedByCars " + sortedByCars);
    green.innerHTML = config.streetNames[sortedByCars[0]];
    yellow.innerHTML = config.streetNames[sortedByCars[1]];
    red.innerHTML = config.streetNames[sortedByCars[2]];

    for (var i = 0; i < sortedByCars; i++) {
      if (streetCarDetails[i] > config.carsForGreen) {
        setTimeout(function () {
          setTimeout(function () {
            clearTraffic(streetCarDetails[i], i);
          }, config.numberOfCarsPassThroughIntersectionPerSecond);
        }, config.minGreenDurationInMilliSeconds);
      }
    }

    function clearTraffic(cars, index) {
      while (cars > 0) {
        cars -= config.numberOfCarsPassThroughIntersectionPerSecond;
        console.log("reducing cars on street " + cars);
      }
      streetCarDetails[index] = cars;
      startTrafficSignal(streetCarDetails);
    }
  }, config.maxWaitForGreenInMilliSeconds);
}

function timer() {
  var streetCarDetails = [];
  for (var i = 0; i < config.streetNames.length; i++) {
    streetCarDetails.push(Math.floor(Math.random() * 10));
  }

  startTrafficSignal(streetCarDetails);
}
function addCar(streetIndex) {}

module.exports = startTrafficSignal;
