// Expression:
// A fragment of code that produces a value is called an expression.
// every value that is written literally like below is an expression.
22
"analysis"

// Statement:
// The simplest kind of statement is an expression with a semicolon after it.
// This is a program:
1;
!false;

// Binding:
// To catch and hold values, Js provides a thing called a binding, or variable.

let caught = 5 * 5;

// let - It is a keyword, indicates that the sentence is going to define a binding.
// caught - is the name of the binding.
// = operator and an expression.

// After a binding has been defined, its name can be used as an expression. The value
// of such an expression is the value the binding currently holds.
// Example:

let ten = 10;
console.log(ten * ten); // 100

let mood = "light";
console.log(mood); // light

mood = "dark";
console.log(mood); // dark

let kitten;
console.log(kitten); // undefined

// A single let statement may define multiple bindings. The definitions must
// be separated by commas:
let one = 1, two = 2;
console.log(one + two); // 3

// The words const and var can also be used to create bindings.
// const - The word const stands for constant. It defines a constant binding, which
// points at the same value for as long as it lives.

// The environment
// The collection of bindings and their values that exist at a given time is called the environment.

// Function
// A function is a piece of program wrapped in a value. Such values can be applied
// in order to run the wrapped program.

// prompt("Enter passcode");

// Arguments - Values given to functions are called arguments.
// Different functions might need a different number or different types of arguments.

// The console.log function
// All modern web browsers and NodeJs provide a console.log function 
// that writes out its arguments to some text output device. In browsers, 
// the output lands in the Javascript console.
// console is an expression that retrieves the log property from the value held by the console binding.

// Side effect
// Showing a dialog box or writing text to the screen is a side effect.
// Many functions are useful because of the side effects they produce.
// Functions may also produce values, in which case they don't need to have a side effect to be useful.


// For example, the function Math.max takes any amount of number arguments and gives back the greatest.
console.log(Math.max(2, 4));

// When a function produces a value, it is said to return that value. Anything that produces a value is an
// expression in Js, which means function calls can be used within larger expressions.
// Ex:
console.log(Math.min(2, 4) + 100); // 102

// Control flow:
// Straight line control flow - When program contains more than one statement.
// the statements are
// executed as though they were a story, from top to bottom.

// The first asks the user for a number,
// and the second, which is executed after the first, shows the square of that
// number:

// let theNumber = Number(prompt("Pick a number"));
// console.log("Your number is the square root of " +
//     theNumber * theNumber);

// Conditional execution:
// if, else/if and else

// While and Do loops
// For loops 
// Breaking out of a loop:
for (let current = 20; ; current = current + 1) {
    if (current % 7 == 0) {
        console.log(current);
        break;
    }
}
// → 21

// Updating bindings succinctly:
let counter = 0;
let result = 1;
counter = counter + 1;

// Shortcut:
counter += 1;
result *= 2; // double result;
counter -= 1; // count downward;

// Even shorter equivalents are:
counter++;
counter--;

// Dispatching on a value with switch:
// It is not uncommon for code to look like this:

// if (x == "value1") action1();
// else if (x == "value2") action2();
// else if (x == "value3") action3();
// else defaultAction();

switch (prompt("What is the weather like?")) {
    case "rainy":
        console.log("Remember to bring an umbrella.");
        break;
    case "sunny":
        console.log("Dress lightly.");
    case "cloudy":
        console.log("Go outside.");
        break;
    default:
        console.log("Unknown weather type!");
        break;
}


// Chapter-2-Exercises-Solved all exercise problems.
// #1 Looping a triangle.
for (let hash = "#"; hash.length < 8; hash += "#") console.log(hash);

// #2 FizzBuzz
for (let n = 1; n <= 100; n++) {
    let output = "";

    if (n % 3 === 0) {
        output += "Fizz";
    }
    if (n % 5 === 0) {
        output += "Buzz";
    }
    // if ((n % 3 === 0) && (n % 5 === 0)) {
    //     output += "FizzBuzz";
    // }
    if ((n % 3 !== 0) && (n % 5 !== 0)) {
        output += n;
    }
    console.log(output || (n));
}

// #3 Chessboard
const size = 8;
let board = "";

for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
        if ((x + y) % 2 == 0) {
            board += " ";
        } else {
            board += "#";
        }
    }
    board += '\n';
}

console.log(board);

//-------------------------------------- 
// #1 Looping a triangle using for, while loop and functions
 
function loopingTriangle() {
    const hash = "#";
    const limit = 7;
    let rowCounter = 1;
    let writingHashToTheRow = "";
    let result = "";

    for (let row = 1; row <= limit; row++) {
        while (rowCounter <= row) {
            writingHashToTheRow += hash;
            rowCounter++;
        }
        result += `${writingHashToTheRow} \n`;
        writingHashToTheRow = ""
        rowCounter = 1;
    }

    return console.log(result);
}

// loopingTriangle();

// using nested for loop
// function loopingTriangle() {
//     const hash = "#";
//     const limit = 7;
//     let writingHashToTheRow = "";
//     let result = "";

//     for (let row = 1; row <= limit; row++) {

//         for (let rowCounter = 1; rowCounter <= row; rowCounter++) {
//             writingHashToTheRow += hash;
//         }

//         result += `${writingHashToTheRow} \n`;
//         writingHashToTheRow = ""
//         rowCounter = 1;
//     }

//     return console.log(result);
// }

// loopingTriangle();

// #2 FizzBuzz
function fizzBuzz() {
    for (let number = 1; number <= 100; number++) {
        if (number % 3 === 0) {
            console.log(number, "Fizz");
        }
        if (number % 5 === 0) {
            console.log(number, "Buzz");
        }
        if ((number % 3 === 0) && (number % 5 === 0)) {
            console.log(number, "FizzBuzz");
        }
        if ((number % 3 !== 0) && (number % 5 !== 0)) {
            console.log(number);
        }
    }
}

// fizzBuzz();

// #3 Chessboard
function chessBoard() {
    const hash = "#";
    const space = " ";
    const size = 8;
    let appendingValueToTheRow = "";
    let columnCounter = 1;
    let board = "";

    for (let row = 1; row <= size; row++) {
        while (columnCounter <= size) {

            if (row % 2 !== 0) {
                if (columnCounter % 2 !== 0) {
                    appendingValueToTheRow += space;
                } if (columnCounter % 2 === 0) {
                    appendingValueToTheRow += hash;
                }
            }
            if (row % 2 === 0) {
                if (columnCounter % 2 !== 0) {
                    appendingValueToTheRow += hash;
                } if (columnCounter % 2 === 0) {
                    appendingValueToTheRow += space;
                }
            }

            columnCounter++;
        }
        board += `${appendingValueToTheRow} \n`;
        appendingValueToTheRow = "";
        columnCounter = 1;
    }

    return console.log(board);
}

// chessBoard();