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

loopingTriangle();

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

fizzBuzz();

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

chessBoard();