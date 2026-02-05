// Chap-08: Bugs and errors

// If program is written, which is basically a thought
// Bugs are categorize into,
// 1. Those caused by the thoughts being confused
// 2. Those caused by mistakes introduced while converting a thought to code.
// The first one seems harder to diagnose and fix than the second one.

// STRICT MODE
// JavaScript can be made a little stricter by enabling strict mode.
// This can done by putting the string "use strict" at the top of a file or a function body.

// Most of modern browsers are now, "strict" by default. 
// When using <script type="module" src="./script.js"></script> it is strict by default.
// The below will show the same error as when writing with "use strict";
// function canYouSpotTheProblem() {
//     "use strict";
//     for (counter = 0; counter < 10; counter++) {
//         console.log("Happy happy");
//     }
// }

// canYouSpotTheProblem(); // uncaught ReferenceError: assignment to undeclared variable counter

// ------------------------------
// 'this' binding holds the value 'undefined' in functions that are not called as methods.

function show() {
    return this;
}

console.log(show()); // undefined

// -----------------------------
// 'this' is in the function not holding value 'undefined' because it is called as methods.
let obj = { name: "Mike", greet };

function greet() {
    return `Hello ${this.name}`;
}

let friend = obj.greet();
console.log(friend); // Hello Mike

// When making a 'fn' call outside of strict mode, this refers to the global scope object,
// which is an object whose properties are the global bindings.
// If you accidentally call a method or constructor incorrectly in strict mode, 
// JavaScript will produce an error as soon as it tries to read something from 'this'.

// In non-strict mode
// function Person(name) { this.name = name; }
// let ferdinand = Person("Ferdinand");
// console.log(name); // TypeError: Cannot set property 'name' of undefined

// In strict mode
// "use strict";
// function Person1(name) { this.name = name; }
// let ferdinando = Person1("Ferdinand");
// console.log(name); // Ferdinand

// Strict mode helps by:
// Catching undeclared variables.
// Preventing silent global pollution.
// Making this safer
// Turning hidden bugs into visible errors.

// TYPES:
// Some languages want to know the types of all your bindings and expressions before even running a program.
// avaScript considers types only when actually running the program, 
// and even there often tries to implicitly convert values to the type it expects, so it’s not much help. 

// Types provide a useful framework for talking about programs.
// A lot of mistakes come from being confused about the kind of value that goes into or comes out of a function.
// If you have that information written down, you're less likely to get confused.

// You could add a comment like the following before the 'findRoute' function
// from the previous chapter to describe its type:

// (graph: Object, from: string, to: string) => string[]
function findRoute(graph, from, to) {
    // ...
}

// One thing about types is that they need to introduce their own complexity
// to be able to describe enough code to be useful.

// function randomPick() using types in the descriptive level it will mention
// it takes T[] -> T, accepts an array and returns an array element which have the same type as an element from
// the array.

// If,
// number[] -> number
// string[] -> string

// When the types of a program are known, it is possible for the computer to
// check them for you, pointing out mistakes before the program is run.

// TESTING:
// If the language is not going to do much to help us find mistakes, we’ll have to
// find them the hard way: by running the program and seeing whether it does
// the right thing.

// AUTOMATED TESTING:
// It is the process of writing a program that test another program. 

// Tests usually take the form of little labeled programs that verify some aspect of your code.
// For ex: a set of tests for the (standard, already tested by someone else) toUpperCase method might look like this:

function test(label, body) {
    if (!body()) console.log(`Failed: ${label}`);
    else console.log(`${label}, test case passed`);
}

test("convert Latin text to uppercase", function () {
    return "hello".toUpperCase() == "HELLO";
});

test("convert Greek text to uppercase", function () {
    return "Χαίρετε".toUpperCase() == "ΧΑΊΡΕΤΕ";
});

test("don't convert case-less characters", function () {
    return "مرحبا".toUpperCase() == "مرحبا";
});

// DEBUGGING
// debugger

// The following example program tries to convert a whole number to a string in a given base (decimal, binary and so on).
// by repeatedly picking out the last digit and then dividing the number to get rid of this digit.
// But the strange
// output that it currently produces suggests that it has a bug.

function numberToString(n, base = 10) {
    let result = "", sign = "";
    if (n < 0) {
        sign = "-";
        n = -n;
    }
    do {
        result = String(n % base) + result;
        n = Math.floor(n / base);

    } while (n > 0);
    return sign + result;
}

console.log(numberToString(-10.5, 10));