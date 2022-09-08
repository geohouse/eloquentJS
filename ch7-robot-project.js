const roads = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House",
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Farm",
  "Grete's House-Shop",
  "Marketplace-Farm",
  "Marketplace-Post Office",
  "Marketplace-Shop",
  "Marketplace-Town Hall",
  "Shop-Town Hall",
];

function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    // This has to be a '==' comparison instead of '===' otherwise it fails
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  // Destructure the from, to information to an array for each of the
  // entries in edges once they've been split on a hyphen.
  for (let [from, to] of edges.map((entry) => entry.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roadGraph = buildGraph(roads);
console.log(roadGraph);

// keeps track of the robot's current location and the collection of letters still
// to be delivered (each with a current location and destination address)

// After each move, a new village state will be computed (like React state where
// each state is an immutable snapshot)

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    // parcels are object[] type
    this.parcels = parcels;
  }

  move(destination) {
    // If can't reach the destination from the current location, then
    // don't change the state
    console.log(`Getting ready to move from ${this.place} to: ${destination}`);
    if (!roadGraph[this.place].includes(destination)) {
      console.log(`Cannot reach: ${destination} from: ${this.place}`);
      return this;
    } else {
      let parcels = this.parcels
        .map((parcel) => {
          // keep any parcel in the array that still needs to be delivered
          // (this.place is current location visited at this point,
          // and destination is the next location to be visited)
          if (parcel.place != this.place) {
            if (parcel.place === destination) {
              console.log(
                `Will be picking up a parcel from: ${parcel.place} to: ${parcel.address}`
              );
            } else {
              console.log(
                `Still need to deliver a parcel from: ${parcel.place} to: ${parcel.address}`
              );
            }
            return parcel;
          }
          // Add parcels to the array that are picked up at the current location
          console.log(
            `Updating a parcel to be from: ${destination} to: ${parcel.address}`
          );
          return { place: destination, address: parcel.address };
        })
        // this delivers the parcels that are addressed to the current place
        // by removing them from the parcels list
        .filter((parcel) => {
          if (parcel.place === parcel.address) {
            console.log(
              `***** Delivered a parcel from: ${parcel.place} to: ${parcel.address}`
            );
          }
          return parcel.place !== parcel.address;
        });
      return new VillageState(destination, parcels);
    }
  }
}

// input params are a VillageState object, a robot function, and a memory of previous moves
function runRobot(state, robot, memory) {
  // no for loop end state in the definition; given based on having
  // no parcels to deliver instead
  for (let turn = 0; ; turn++) {
    if (state.parcels.length === 0) {
      console.log(`Done in ${turn} turns`);
      return turn;
      //break;
    }
    // Call the robot fxn with the current state, and provide its memory.
    // returns an action that will get added to its current memory
    let action = robot(state, memory);
    // returns new VillageState, with updated parcel list (parcels being carried
    // have updated addresses, and parcels that were delivered have been removed from the
    // parcel array)
    state = state.move(action.direction);
    memory = action.memory;
    //console.log(`Moved to ${action.direction}`);
  }
}

function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

// random robot has no memory - ignores it from input params and doesn't include
// it in the output
function randomRobot(state) {
  return { direction: randomPick(roadGraph[state.place]) };
}

// let first = new VillageState("Post Office", [
//   { place: "Post Office", address: "Alice's House" },
// ]);

// Add a static method (as directly adding a property to the constructor)
VillageState.random = function (parcelCount = 5) {
  let parcels = [];
  for (let index = 0; index < parcelCount; index++) {
    let address = randomPick(Object.keys(roadGraph));
    let deliveryPlace;
    // Don't create parcels addressed to their origin
    do {
      deliveryPlace = randomPick(Object.keys(roadGraph));
    } while (deliveryPlace === address);
    // re-name deliveryPlace to 'place' in the parcels object.
    // deliveryPlace and address are string[] with length 1
    parcels.push({ place: deliveryPlace, address });
  }
  console.log("The parcels are:");
  console.log(parcels);
  return new VillageState("Post Office", parcels);
};

const mailRoute = [
  "Alice's House",
  "Cabin",
  "Alice's House",
  "Bob's House",
  "Town Hall",
  "Daria's House",
  "Ernie's House",
  "Grete's House",
  "Shop",
  "Grete's House",
  "Farm",
  "Marketplace",
  "Post Office",
];

function routeRobot(state, memory) {
  if (memory.length === 0) {
    memory = mailRoute;
  }
  // use the first item of the memory array as the direction for the current turn
  // then remove it from memory
  return { direction: memory[0], memory: memory.slice(1) };
}

function findRoute(graph, from, to) {
  // This is a work list of places that need to be explored
  let work = [{ at: from, route: [] }];
  for (let index = 0; index < work.length; index++) {
    let { at, route } = work[index];
    // Loop through the locations visitable from the current spot, based on the graph
    for (let place of graph[at]) {
      if (place === to) {
        return route.concat(place);
      }
      // implicitly drop searching for other routes between the current 'from'
      // (here the workItem.at) and the current 'to' (here the places in the graph
      // reachable from the current location) because they'd be at least as long (
      // those routes would be accessible through the else statement if it existed)
      if (
        !work.some((workItem) => {
          workItem.at === place;
        })
      ) {
        work.push({ at: place, route: route.concat(place) });
      }
    }
  }
}

// optimization attempt
// {place, parcels} is destructuring the state variable passed in
function goalRobot_optimize({ place, parcels }, route) {
  console.log("parcel mapping");
  parcels.map((parcel) => console.log(parcel));
  console.log("end");
  console.log("goal oriented route is:");
  console.log({ route });
  console.log({ place });

  if (route.length === 0) {
    // calculate routes for all parcels
    let routeHolder = parcels.map((parcel) => {
      // pick up route needed
      if (parcel.place !== place) {
        route = findRoute(roadGraph, place, parcel.place);
        return { route: route, type: "pickup" };
      } else {
        // Drop off route needed
        route = findRoute(roadGraph, place, parcel.address);
        return { route: route, type: "delivery" };
      }
    });

    console.log("goal robot optimize route holder is:");
    console.log(routeHolder);

    // Prefer pickup routes with this multiplied weight (higher values give more weight)
    const pickupWeight = 3;

    let currMaxScoreForRoute;
    let currMaxScoreRoute = [];

    for (let index = 0; index < routeHolder.length; index++) {
      let currScore =
        (routeHolder[index].type === "pickup" ? pickupWeight : 1) -
        routeHolder[index].route.length;
      if (index === 0) {
        currMaxScoreForRoute = currScore;
        currMaxScoreRoute = routeHolder[index].route;
      } else {
        if (currScore > currMaxScoreForRoute) {
          currMaxScoreForRoute = currScore;
          currMaxScoreRoute = routeHolder[index].route;
        }
      }
    }

    route = currMaxScoreRoute;
  }
  console.log({ route });
  console.log(route);

  // if (route.length === 0) {
  //   let parcel = parcels[0];
  //   console.log(parcel["place"]);
  //   console.log(parcel.address);
  //   if (parcel.place != place) {
  //     route = findRoute(roadGraph, place, parcel.place);
  //   } else {
  //     route = findRoute(roadGraph, place, parcel.address);
  //   }
  // }
  // console.log("Direction route[0] is:");
  // console.log(route[0]);
  // console.log("Memory route.slice(1) is:");
  // console.log(route.slice(1));
  return {
    direction: route[0],
    memory: route.slice(1),
  };
}

// place is the current location
function goalOrientedRobot({ place, parcels }, route) {
  console.log("goal oriented route is:");
  console.log({ route });
  console.log({ place });
  if (route.length === 0) {
    let parcel = parcels[0];
    console.log(parcel["place"]);
    console.log(parcel.address);
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return { direction: route[0], memory: route.slice(1) };
}

// runRobot(VillageState.random(), randomRobot);
//runRobot(VillageState.random(), routeRobot, []);
const numTurnsTaken = runRobot(VillageState.random(), goalRobot_optimize, []);
console.log("a random village state is:");
console.log(VillageState.random());
console.log({ numTurnsTaken });

// measuring robots
function compareRobots(robot1, memory1, robot2, memory2) {
  let turnsTakenHolder = { robot1: [], robot2: [] };
  for (let taskCount = 0; taskCount < 100; taskCount++) {
    let state = VillageState.random();
    let turnsRobot1 = runRobot(state, robot1, memory1);
    let turnsRobot2 = runRobot(state, robot2, memory2);
    turnsTakenHolder.robot1.push(turnsRobot1);
    turnsTakenHolder.robot2.push(turnsRobot2);
  }
  meanTurnsTakenRobot1 =
    turnsTakenHolder.robot1.reduce((total, current) => (total += current), 0) /
    100;
  meanTurnsTakenRobot2 =
    turnsTakenHolder.robot2.reduce((total, current) => (total += current), 0) /
    100;
  console.log({ meanTurnsTakenRobot1 });
  console.log({ meanTurnsTakenRobot2 });
}

compareRobots(goalRobot_optimize, [], goalOrientedRobot, []);

// Trying to improve robot efficiency
//
