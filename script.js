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
    console.log("state", state, "robot", robot, "memory", memory);

    for (let turn = 0; ; turn++) {
        if (state.parcels.length == 0) {
            console.log(`Done in ${turn} turns`);
            break;
        }

        let action = robot(state, memory);
        console.log("action:", action);
        
        state = state.move(action.direction);
        console.log("state:", state);
        
        memory = action.memory;
        console.log(`Moved to ${action.direction}`);
    }
}

// Dumbest strategy that could work, 
// The robot could just walk in a random direction every turn.
// That means, with great likelihood, it will eventually run into all parcels and then 
// also at some point reach the place where they should be delivered.
// Here’s what that could look like:

function randomPick(array) {
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

VillageState.random = function (parcelCount = 2) {
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
    return new VillageState("Post Office", parcels);
};

runRobot(VillageState.random(), randomRobot);

// console.log(VillageState);

// VillageState.prototype.hello = function () {
//     return 'Say hello world!';
// }

