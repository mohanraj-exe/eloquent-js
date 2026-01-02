// Our project in this chapter is to build an automaton, a little program that perform tasks in a virtual world.
// Our automaton will be a mail-delivery robot picking up and dropping off parcels.

// MeadowField
// The village of MeadowField isn't very big. It consists of 11 places with 14 roads between them.
// It can be described with the array of roads:

const roads = [
    "Alice's House-Bob's House", "Alice's House-Cabin",
    "Alice's House-Post Office", "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop", "Marketplace-Farm",
    "Marketplace-Post Office", "Marketplace-Shop",
    "Marketplace-Town Hall", "Shop-Town Hall"
];

// The network of roads in the village forms a graph. 
// A graph is a collection of points (places in the village) with lines between them (roads).
// The graph will be the world our robot moves through.

// We are interested in is the destinations that we can reach from a given place.
// Let's convert the list of roads to a data structure that, for each place, tells us what we
// can be reached from there.

function buildGraph(edges) {
    let graph = Object.create(null);

    function addEdge(from, to) {
        if (from in graph) { // using 'in' operator to check if the property exists in the graph object.
            graph[from].push(to);
        } else {
            graph[from] = [to];
        }
    }

    for (let [from, to] of edges.map(r => r.split("-"))) {
        // console.log([from, to]);

        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}

const roadGraph = buildGraph(roads);
console.log(roadGraph);

// Given an array of edges, buildGraph creates a map object that, for each node, stores an array of connected nodes.
// It uses the split method to go from the road strings-which have the form "Start-End"- to two-element arrays containing
// the start and end as seperate strings.

// THE TASK
// Our robot will be moving around the village.
// There are parcels in various places, each addressed to some other place.
// The robot picks up parcels when it comes across them and delivers them when it arrives at their destinations.

// The automaton must decide, at each point, where to go next. It has finished its task when all parcels have
// been delivered.

// To be able to simulate this process, we must define a virtual world that can describe it.
// This model tells us where the robot is and where the parcels are.
// When the robot has decided to move somewhere, we need to update the model to reflect the new situation.

// Instead of writing class for each, writing like such programs are often hard to understand and 
// thus easy to break.

// Instead, let's condense the village’s state down to the minimal set of values that define it.
// There's the robot's current location and the collection of undelivered parcels, each of which 
// has a current location and a destination address.

// We don't change this state when the robot moves but rather compute a new state after the move.

class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }

    move(destination) {
        if (!roadGraph[this.place].includes(destination)) {
            return this;
        } else {
            let parcels = this.parcels.map(p => {
                if (p.place != this.place) return p;
                return { place: destination, address: p.address };
            }).filter(p => p.place != p.address);

            // console.log(parcels);

            let state = new VillageState(destination, parcels);
            // console.log("new state:", state);

            return state;
        }
    }
}

let first = new VillageState(
    "Post Office",
    [{ place: "Post Office", address: "Alice's House" }]
);

console.log(first);

let next = first.move("Alice's House");
// let next = first.move("Kid's Garden");
console.log(next);

// PERSISTENT DATA
// Data structure that don't change are called immutable or persistent.
// They behave a lot like strings and numbers in that they are who they are and stay that way, 
// rather than containing different things at different times.

let object = Object.freeze({ value: 5 }); // It prevents the addition of new properties.
// object.value = 10;
// console.log(object.value); // 5 // Error -> value is read-only.

// When the objects in my system are fixed, stable things,
// I can consider operations on them in isolation—moving to Alice’s house from a
// given start state always produces the same new state.
// When objects change over time, that adds a whole new dimension of complexity to this kind of reasoning.

// SIMULATION

// A mail-delivery robot looks at the world and decides in which direction it wants to move.
// So we could say that a robot is a function that takes a VillageState object and
// returns the name of a nearby place.

// Because we want robots to be able to remember things so they can make and execute plans, we also pass
// them their memory and allow them to return a new memory.
// Thus, the thing a robot returns is an object containing both the direction it wants 
// to move in and a memory value.

// Example: 
// { direction: "It wants to move in", memory: "memory value" }

function runRobot(state, robot, memory) {
    // console.log("state", state, "robot", robot, "memory", memory);

    for (let turn = 0; ; turn++) {
        if (state.parcels.length == 0) {
            // console.log(`Done in ${turn} turns`);
            break;
        }

        let action = robot(state, memory);
        // console.log("action:", action);

        state = state.move(action.direction);
        // console.log("state:", state);

        memory = action.memory;
        // console.log(`Moved to ${action.direction}`);
    }
}

// Dumbest strategy that could work, 
// The robot could just walk in a random direction every turn.
// That means, with great likelihood, it will eventually run into all parcels and then 
// also at some point reach the place where they should be delivered.
// Here’s what that could look like:

function randomPick(array) {
    // console.log(array);

    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

function randomRobot(state) {
    return { direction: randomPick(roadGraph[state.place]) };
}

// Since this robot does not need to remember anything, it ignores its argument and
// omits the memory property in its returned object.

// To put this sophisticated robot to work, we’ll first need a way to create a
// new state with some parcels. A static method is a good place to put that functionality.

VillageState.random = function (parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph));
        let place;

        do {
            place = randomPick(Object.keys(roadGraph));
        } while (place == address);

        // console.log("address:", address);
        // console.log("place:", place);

        parcels.push({ place, address });
    }

    let state = new VillageState("Post Office", parcels);
    // console.log(state);
    return state;
};

runRobot(VillageState.random(), randomRobot);

// console.log(VillageState);

// VillageState.prototype.hello = function () {
//     return 'Say hello world!';
// }

// THE MAIL TRUCK'S ROUTE:
// An easy improvement would be to take a hint from the way real-world mail delivery works.
// If we find a route that passes all places in the village, the robot could run that
// route twice, at which point it is guaranteed to be done. Here is one such route
// (starting from the post office):

const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"];

// To implement the route-following robot, we'll need to make use of memory.
// The robot keeps the rest of its route in its memory and drops the first element every turn.

function routeRobot(state, memory) {
    if (memory.length == 0) {
        memory = mailRoute;
    }
    return { direction: memory[0], memory: memory.slice(1) };
}

// console.log(routeRobot(mailRoute));

// PATHFINDING
function findRoute(graph, from, to) {
    let work = [{ at: from, route: [] }];
    // console.log(work);

    for (let i = 0; i < work.length; i++) {
        let { at, route } = work[i];

        // if (i) {
        //     console.log(at, route);
        // }

        // console.log(i);

        for (let place of graph[at]) {
            // console.log(place);

            if (place == to) return route.concat(place);
            if (!work.some(w => w.at == place)) {
                work.push({ at: place, route: route.concat(place) });
            }
        }
    }

}

console.log(findRoute(roadGraph, 'Post Office', "Ernie's House"));

// work = [{ at: 'Post Office', route: [] }];
// i = 0;

// work = [{ at: 'Post Office', route: [] }, // 0
//         { at: 'Alice', route: ['Alice'] }, // 1
//         { at: 'MarketPlace', route: ['MarketPlace'] // 2
// }];

// i = 1;
// work[1] = { at: 'Alice', route: ['Alice'] };
// at = 'Alice', route = ['Alice']

// Alice -> Bob, Cabin, PO

// first if: place = "Bob", to = "Town Hall" (Not equal)
// second if: place = "Bob" (This key not exists in the 'work' array) // false // condition satisfied
// push -> { at: "Bob", route: ["Alice", "Bob"] }

// first if: place = "Cabin", to = "Town Hall" (Not equal)
// second if: place = "Cabin" (This key not exists in the 'work' array)
// push -> { at: "Cabin", route: ['Alice', 'Cabin'] }

// first if: place = "PO", to = "Town Hall" (Not equal)
// second if: place = "PO" (equal) // true // condition not satisfied
// Not pushing { ... }

// work = [{ at: 'Post Office', route: [] }, // 0
//         { at: 'Alice', route: ['Alice'] }, // 1
//         { at: 'MarketPlace', route: ['MarketPlace'] // 2
//         { at: "Bob", route: ["Alice", "Bob"] }, // 3
//         { at: "Cabin", route: ['Alice', 'Cabin'] } // 4
// }];

// i = 2;
// work[2] = { at: 'MarketPlace', route: ['MarketPlace'] };
// at = 'MarketPlace', route = ['MarketPlace'];

// Market Place -> Farm, PO, Shop, Town Hall

// first if: place = "Farm", to = "Town Hall" (Not equal)
// second if: place = "Farm" (This key not exists in the 'work' array)
// push -> { at: "Farm", route: ['MarketPlace', 'Farm'] }

// first if: place = "PO", to = "Town Hall" (Not equal)
// second if: place = "PO" (equal) // true // condition not satisfied
// Not pushing { ... }

// first if: place = "Shop", to = "Town Hall" (Not equal)
// second if: place = "Shop" (This key not exists in the 'work' array)
// push -> { at: "Shop", route: ['MarketPlace', 'Shop'] }

// work = [{ at: 'Post Office', route: [] }, // 0
//         { at: 'Alice', route: ['Alice'] }, // 1
//         { at: 'MarketPlace', route: ['MarketPlace'] // 2
//         { at: "Bob", route: ["Alice", "Bob"] }, // 3
//         { at: "Cabin", route: ['Alice', 'Cabin'] } // 4
//         { at: "Farm", route: ['MarketPlace', 'Farm'] } // 5
//         { at: "Shop", route: ['MarketPlace', 'Shop'] } // 6
// }];

// first if: place = "Town Hall", to = "Town Hall" (equal)
// return -> { route: ['MarketPlace', 'Town Hall'] } // result

// -------------------------
// using the below function
// console.log(findRoute(roadGraph, 'Post Office', "Ernie's House"));

// first if: place = "Town Hall", to = "Ernie's House" (Not equal)
// second if: place = "Town Hall" (This key not exists in the 'work' array)
// push -> { at: "Town Hall", route: ['MarketPlace', 'Town Hall' ] }

// work = [{ at: 'Post Office', route: [] }, // 0
//         { at: 'Alice', route: ['Alice'] }, // 1
//         { at: 'MarketPlace', route: ['MarketPlace'] // 2
//         { at: "Bob", route: ["Alice", "Bob"] }, // 3
//         { at: "Cabin", route: ['Alice', 'Cabin'] } // 4
//         { at: "Farm", route: ['MarketPlace', 'Farm'] } // 5
//         { at: "Shop", route: ['MarketPlace', 'Shop'] } // 6
//         { at: "Town Hall", route: ['MarketPlace', 'Town Hall' ] } // 7
// }];

// i = 3;
// work[3] = { at: "Bob's House", route: ["Alice's House" , "Bob's House"] };
// at = "Bob's House", route = ["Alice's House" , "Bob's House"];

// "Bob's House" -> "Alice's House", "Town Hall"

// first if: place = "Alice's House", to = "Ernie's House" (Not equal)
// second if: place = "Alice's House" // (equal) (This key exists in the 'work' array)
// Not pushing { ... }

// first if: place = "Town Hall", to = "Ernie's House" (Not equal)
// second if: place = "Town Hall" // (equal) (This key exists in the 'work' array)
// Not pushing { ... }

// i = 4;
// work[4] = { at: 'Cabin', route: ["Alice's House" , 'Cabin'] };
// at = 'Cabin', route = ["Alice's House" , 'Cabin'];

// 'Cabin' -> "Alice's House"

// first if: place = "Alice's House", to = "Ernie's House" (Not equal)
// second if: place = "Alice's House" // (equal) (This key exists in the 'work' array)
// Not pushing { ... }

// i = 5;
// work[5] = { at: "Farm", route: ['MarketPlace', 'Farm'] };
// at = 'Farm', route = ['MarketPlace', 'Farm'];

// "Farm" -> 'MarketPlace', "Grete's House"

// first if: place = "MarketPlace", to = "Ernie's House" (Not equal)
// second if: place = "MarketPlace" // (equal) (This key exists in the 'work' array)
// Not pushing { ... }

// first if: place = "Grete's House", to = "Ernie's House" (Not equal)
// second if: place = "Grete's House" // (This key not exists in the 'work' array)
// push -> { at: "Grete's House", route: ['MarketPlace', 'Farm', "Grete's House" ] }

// work = [{ at: 'Post Office', route: [] }, // 0
//         { at: 'Alice', route: ['Alice'] }, // 1
//         { at: 'MarketPlace', route: ['MarketPlace'] // 2
//         { at: "Bob", route: ["Alice", "Bob"] }, // 3
//         { at: "Cabin", route: ['Alice', 'Cabin'] } // 4
//         { at: "Farm", route: ['MarketPlace', 'Farm'] } // 5
//         { at: "Shop", route: ['MarketPlace', 'Shop'] } // 6
//         { at: "Town Hall", route: ['MarketPlace', 'Town Hall' ] } // 7
//         { at: "Grete's House", route: ['MarketPlace', 'Farm', "Grete's House" ] } // 8
// }];

// i = 6;
// work[6] = { at: "Shop", route: ['MarketPlace', 'Shop'] };
// at = 'Shop', route = ['MarketPlace', 'Shop'];

// 'Shop' -> [ "Grete's House", "Marketplace", "Town Hall" ]

// first if: place = "Grete's House", to = "Ernie's House" (Not equal)
// second if: place = "Grete's House" // (equal) (This key exists in the 'work' array)
// Not pushing { ... }

// first if: place = "MarketPlace", to = "Ernie's House" (Not equal)
// second if: place = "MarketPlace" // (equal) (This key exists in the 'work' array)
// Not pushing { ... }

// first if: place = "Town Hall", to = "Ernie's House" (Not equal)
// second if: place = "Town Hall" // (equal) (This key exists in the 'work' array)
// Not pushing { ... }

// i = 6;
// work[6] = { at: "Town Hall", route: ['MarketPlace', "Town Hall"] };
// at = "Town Hall", route = ['MarketPlace', "Town Hall"];

// "Town Hall" -> [ "Bob's House", "Daria's House", "Marketplace", 'Shop' ]

// first if: place = "Bob's House", to = "Ernie's House" (Not equal)
// second if: place = "Bob's House" // (equal) (This key exists in the 'work' array)
// Not pushing { ... }

// first if: place = "Daria's House", to = "Ernie's House" (Not equal)
// second if: place = "Daria's House" // (Not equal) (This key not exists in the 'work' array)
// push -> { at: "Daria's House" , route: ['MarketPlace', "Town Hall", "Daria's House"] }

// work = [{ at: 'Post Office', route: [] }, // 0
//         { at: 'Alice', route: ['Alice'] }, // 1
//         { at: 'MarketPlace', route: ['MarketPlace'] // 2
//         { at: "Bob", route: ["Alice", "Bob"] }, // 3
//         { at: "Cabin", route: ['Alice', 'Cabin'] } // 4
//         { at: "Farm", route: ['MarketPlace', 'Farm'] } // 5
//         { at: "Shop", route: ['MarketPlace', 'Shop'] } // 6
//         { at: "Town Hall", route: ['MarketPlace', 'Town Hall' ] } // 7
//         { at: "Grete's House", route: ['MarketPlace', 'Farm', "Grete's House" ] } // 8
//         { at: "Daria's House" , route: ['MarketPlace', "Town Hall", "Daria's House"] } // 9
// }];

// first if: place = "Marketplace", to = "Ernie's House" (Not equal)
// second if: place = "Marketplace" // (Not equal) (This key exists in the 'work' array)
// Not pushing { ... }

// first if: place = "Shop", to = "Ernie's House" (Not equal)
// second if: place = "Shop" // (Not equal) (This key exists in the 'work' array)
// Not pushing { ... }

// i = 9;
// work[9] = { at: "Grete's House", route: ['MarketPlace', 'Farm', "Grete's House"] };
// at = "Grete's House", route = ['MarketPlace', 'Farm', "Grete's House"];

// "Grete's House" -> [ "Ernie's House", "Farm", "Shop" ]

// first if: place = "Ernie's House", to = "Ernie's House" (Equal)
// return -> ['MarketPlace', 'Farm', "Grete's House", "Ernie's House"]


// Goal oriented robot
function goalOrientedRobot({ place, parcels }, route) {
    // console.log("place:", place, "parcels:", parcels, "route:", route);

    if (route.length == 0) {
        let parcel = parcels[0];
        if (parcel.place != place) {
            route = findRoute(roadGraph, place, parcel.place);
        } else {
            route = findRoute(roadGraph, place, parcel.address);
        }
    }

    return { direction: route[0], memory: route.slice(1) };
}

// Exercises:
// 1. MEASURING A ROBOT

function countSteps(state, robot, memory) {
    for (let steps = 0; ; steps++) {
        if (state.parcels.length == 0) return steps;

        let action = robot(state, memory);
        // console.log(action);

        state = state.move(action.direction);
        memory = action.memory;
        // console.log(steps);
    }
}

function compareRobots(robot1, memory1, robot2, memory2) {
    // It should accepts two robots as input and starting memory.
    // It should generate 100 tasks and let both of the 
    // robots solve each of these tasks.

    // Expected result: Avg. number of steps each robot took per task.

    let total1 = 0, total2 = 0;

    for (let i = 0; i < 100; i++) {
        let state = VillageState.random();
        // console.log(state);
        total1 += countSteps(state, robot1, memory1);
        total2 += countSteps(state, robot2, memory2);
    }

    console.log(`Robot 1 needed ${Math.floor(total1 / 100)} steps per task`);
    console.log(`Robot 2 needed ${Math.floor(total2 / 100)} steps per task`);

}

console.log(compareRobots(routeRobot, [], goalOrientedRobot, []));
// console.log(compareRobots(myRobot, [], goalOrientedRobot, []));

// 2. ROBOT EFFICIENCY

function myRobot({ place, parcels }, route) {

    if (route.length == 0) {

        let routes = parcels.map(parcel => {
            if (parcel.place != place) {
                return {
                    route: findRoute(roadGraph, place, parcel.place),
                    pickUp: true
                };
            } else {
                return {
                    route: findRoute(roadGraph, place, parcel.address),
                    pickUp: false
                };
            }
        });

        // console.log(routes);

        function score({ route, pickUp }) {
            return (pickUp ? 0.5 : 0) - route.length;
        }

        route = routes.reduce((a, b) => score(a) > score(b) ? a : b).route;
    }

    return { direction: route[0], memory: route.slice(1) };

}

console.log(myRobot(VillageState.random(), []));

// 3. PERSISTENT GROUP

let pSet = new Set();
// console.log(Object.getPrototypeOf(pSet));

pSet.add(0);
pSet.add(0);
// console.log(pSet);

class PGroup {
    // Expected result should have behaviour of Array.prototype.concat or
    // Array.prototype.slice methods, returning a new array, not modifying the old one.

    // Likewise Set has no methods for creating a new set with
    // an item added or removed.

    #members = [];
    #workingArr = this.#members;

    static empty() {
        return new PGroup();
    };

    add(value) {
        if (!this.has(value)) {
            this.#members.push(value);
            this.#workingArr = [...this.#members];
            return this.#workingArr;
        }
    }

    delete(value) {
        this.#workingArr = this.#workingArr.filter(e => e != value);
    }

    has(value) {
        return this.#workingArr.includes(value);
    }

}

let pG_Instance = PGroup.empty();
pG_Instance.add(0);
pG_Instance.add(1);
pG_Instance.add(1);
pG_Instance.add("hello");
pG_Instance.delete("hello");
pG_Instance.delete(0);
console.log(pG_Instance.has(0));
console.log(pG_Instance);

// Author's Solution: [Exactly matching the requirements]
class PGroup1 {
    #members;

    constructor(members){
        this.#members = members;
    }
    
    static empty = new PGroup1([]);
    
    has(value) {
        return this.#members.includes(value);
    }
    
    add(value) {
        if (this.has(value)) return this;
        return new PGroup1(this.#members.concat(value));
    }

    delete(value) {
        if (!this.has(value)) return this;
        return new PGroup1(this.#members.filter(e => e != value));
    }
}

let a = PGroup1.empty.add("a");
console.log(a); // ["a"]

// let a = PGroup1.empty
// 1. #members = [];

// let a = PGroup1.empty.add("a");
// checks by 'has' method.
// 1. #members = []; includes "a" // false
// 1. #members = []; [].concat("a"); // ["a"]
// return new PGroup1(["a"])
// 2. #members = ["a"]

let ab = a.add("b");
// a -> 2. #members = ["a"]
// checks by 'has' method.
// 2. #members = ["a"] includes "b" // false
// 2. #members = ["a"]; ["a"].concat("b"); ["a", "b"]
// return new PGroup1(["a", "b"])
// 3. #members = ["a", "b"]

console.log(ab); // ["a", "b"]

let b = ab.delete("a");
// ab -> 3. #members = ["a", "b"]
// checks by 'has' method.
// 3. #members = ["a", "b"] includes "a" // true 
// 3. #members = ["a", "b"]; filter "a" and get ["b"];
// return new PGroup1(["b"])
// 4. #members = ["b"]

console.log(b); // ["b"]
// console.log(a); // ["a"]

console.log(b.has("b")); // true
console.log(b.has("a")); // false
console.log(a.has("b")); // false