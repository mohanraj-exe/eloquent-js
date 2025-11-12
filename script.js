import { SCRIPTS } from "./SCRIPTS.js";

// Sum of a range:
let total = 0;

for (let range = 1; range <= 10; range += 1) {
    total += range;
};

function range(start, end) {
    let arr = [];
    for (let i = start; i <= end; i += 1) {
        arr.push(i);
    }
    return arr;
}

function sum(arr) {
    // console.log(arr);
    let result = 0;
    for (let element of arr) {
        result += element;
    }
    return result;
}

// console.log(sum);
// console.log(range(1, 10));
console.log(sum(range(1, 10)));

// Which one is Likely to contain a bug? Second one.
// This is because the solution is expressed in a vocabulary that corresponds to the problem being solved. 
// Summing a range of numbers isn’t about loops and counters. It is about ranges and sums.

// Abstraction:
// In the context of programming, these kinds of vocabularies are usually called abstractions.
// Abstractions give us the ability to talk about problems at a higher level
// Higher-order functions allow us to abstract over actions, not just values.

// Abstracting repetition:
function repeat(n, action) {
    for (let i = 0; i < n; i++) {
        action(i);
    }
}

repeat(2, console.log);
// 0
// 1

// We don't have to pass predefined function to repeat. Often, it is easier to create a function value on the spot instead.

let labels = [];
repeat(2, i => {
    labels.push(`Unit ${i + 1}`);
});

console.log(labels);

// Example for abstract over values:
// We make functions that handle different values but do the same operation.
function add10(x) {
    return x + 10;
}

add10(5); // 15
add10(10); // 20 
// Here the action adding 10 is fixed. The value x can vary - that's what we're abstracting over.
// So this abstracts over values — it works for any input number.

// Higher-order functions abstract over actions:
// Now, what if we want to make a function that doesn't just handle different values,
// but handles different actions - things to do?

// Examples for abstract over actions:
// Refer action function above

// Here, we're not only replacing numbers - we're replacing what to do in the loop
// so we can call:

// repeat(2, prompt);
// repeat(2, console.log);
repeat(2, i => console.log(i));
// repeat(2, action());

// console.log(typeof (action));

function exFn() {
    return i => i + 1;
}

const result = exFn();
console.log(result);
console.log(result(10));

function noisy(f) {
    return (...args) => {
        console.log("Calling with:", args);
        const result = f(...args);
        console.log("Called with", args, "returned", result);

        return result;
    }
};

noisy(Math.min)(3, 2, 1);
// noisy(Math.min) first called and the returned function is called immediately with (3, 2, 1).

// We can even write functions that provide new types of control flow.
// function repeat(n, action) {
//     for (let i = 0; i < n; i++) {
//         action(i);
//     }
// }

function unless(test, then) {
    if (!test) then();
}

repeat(3, n => {
    unless(n % 2 == 1, () => {
        console.log(n, "is even");
    });
});

// first repeat function gets called, the second argument is an arrow function.
// There is a built-in array method, forEach, that provides something like a for/of 
// loop as a higher-order function.

["A", "B"].forEach(l => console.log(l));
// A
// B

// Script Dataset
// Unicode - The system that assigns a number to each character in written language, most of these characters are
// associated with a specific script. The standard contains 140 different scripts, of which 81 are still in use
// today and 59 are historic.

let exObj = {
    name: "Coptic", // name of the script
    ranges: [[994, 1008], [11392, 11508], [11513, 11520]], // unicode ranges for the script
    direction: "ltr", // the direction in which it is written
    year: -200, // the (approximate) origin time
    living: false, // whether it is still in use
    link: "https://en.wikipedia.org/wiki/Coptic_alphabet" // link to more information
};

// Filtering arrays
function filter(array, test) {
    let passed = [];

    for (let element of array) {
        if (test(element)) {
            passed.push(element)
        }
    }

    return passed;
}

console.log(filter(SCRIPTS, script => script.living));

// The function uses the argument named test, a function value, the process of deciding which elements to collect.
// Rather than deleting elements from the existing array, builds up a new array with only the elements that passes the test.
// This function is pure. It is not modify the array it is given.

// The function filter can be written with array filter method.
// Like forEach, filter is a standard array method.

console.log(SCRIPTS.filter(s => s.direction === "ttb"));

// Transforming with map:
// The map method transforms an array by applying a function to all of its elements and building a new array from the
// returned values. The new array will have the same length as the input array, but its content will have been mapped to a
// new form by the function.

function map(array, transform) {
    let mapped = [];

    for (const element of array) {
        mapped.push(transform(element));
    }

    return mapped;
}

const rtlScripts = SCRIPTS.filter(s => s.direction === "rtl");
// console.log(rtlScripts);
console.log(map(rtlScripts, s => s.name));

// The above map function can be written with an in-built array map method.
console.log(rtlScripts.map(s => s.name));

// Summarizing with Reduce:
// Another common thing to do with arrays is to compute a single value from them.
// Example 1: Summing a collection of numbers, is an instance of this.
// Example 2: Finding the script with the most characters.

// Higher-order function represent this pattern is called reduce(sometimes also called fold).
// It builds a value by repeatedly taking single element from the array and combining it with the current value.
// When summing numbers, you'd start with the number zero and, for each element, add that to the sum.

function reduce(array, combine, start) {
    let current = start;

    for (const element of array) {
        current = combine(current, element)
    }

    return current;
}

console.log(reduce([1, 2, 3, 4, 5], (a, b) => a + b, 0));

// The standard array method reduce, which of course corresponds to this function, has an added convenience.
// If your array contains at least one element, you are allowed to leave off the start argument.
// The method will take the first element of the array as its start value and reducing the second element.

console.log([1, 2, 3, 4].reduce((a, b) => a + b));

// To use reduce(twice) to find the script with the most characters, we can write something like this:
function characterCount(script) {
    return script.ranges.reduce((count, [from, to]) => {
        return count + (to - from);
    }, 0);
};

console.log(SCRIPTS.reduce((a, b) => {
    return characterCount(a) < characterCount(b) ? b : a;
}));

// function characterCount uses to sum the character code for the script.
// count is the accumulator, destructured [from, to] is the currentValue from the ranges array.

// iteration - 1:
// count = 0 (0 is given initially), so the start value is 0 (given)
// [from, to] = [994, 1008]. from = 994, to = 1008
// returns 14, so the accum = 14, count (new) = 14

// iteration - 2:
// count = 14 returned from the previous iteration. // accumulator
// [from, to] = [11392, 11508]
// returns 116, so the accum = 14 + 116 = 130. count (new) = 130.

// ranges in the characterCount function finished. returns a single value say 500 for the characterCount(a)
// this gets compared with the function characterCount(b), the value which is returned by it, max value gets returned.
// Note: If accumulator is not given, it starts with the index 0, if given, it starts with the index 1.

// Composability:
let biggest = null;

for (let script of SCRIPTS) {
    if (biggest == null ||
        characterCount(biggest) < characterCount(script)) {
        biggest = script;
    }
}
// console.log(biggest);

// from the first iteration
// biggest == null, which is true. so it skips the right side of it.
// now biggest = script;

// second iteration:
// biggest = script (assigned in the last iteration)
// now biggest is not null, it executes the right hand side of it.
// characterCount function calls with an argument biggest, it returns a value, that will be compared with the next one.

// The abstractions these functions provide really shine when you need to compose operations.
// As an example, let's write code that finds the average year of origin for living and dead scripts in the dataset.

function average(array) {
    return array.reduce((a, b) => a + b) / array.length;
}

console.log(Math.round(average(SCRIPTS.filter(s => s.living).map(s => s.year)))); // 1165 // example-01
console.log(Math.round(average(SCRIPTS.filter(s => !s.living).map(s => s.year)))); // 204 // example-02

// You can see it as a pipeline: we start with all scripts, filter out the living(or dead) ones, take the years from
// those, average them, and round the result.

// You could definitely also write this computation as one big loop.

let totalVar = 0, count = 0;

for (const script of SCRIPTS) {
    if (script.living) {
        totalVar += script.year;
        count += 1;
    }
};

console.log(Math.round(totalVar)); // 1165 for living // 204 for dead scripts (same as above results)
// However, it is harder to see what was being computed and how. And because intermediate results aren't represented
// as coherent values, it'd be a lot more work to extract something like avg. into a seperate function.

// intermediate results are: part in totalVar and in count
// totalVar = 96701
// count = 83

// but in the abstract function intermediate result is a single value.

// In terms of what the computer is actually doing, these two approaches are also quite different.
// The first will build up new arrays when running filter and map
// The second computes only some numbers, doing less work.
// You can usually afford the readable approach, but if you’re processing huge arrays and doing so many times
// the less abstract style might be worth the extra speed.

// String and Character codes
function characterScript(code) {
    for (const script of SCRIPTS) {
        // if (script.ranges.some())
        // console.log(script);
        if (script.ranges.some((([from, to]) => { return code >= from && code < to }))) {
            return script;
        }
    }
    return null;
}

console.log(characterScript(2947)); // returning an Tamil Object

//'Some' method is another higher-order function.
// It takes a test function and tells you whether that function returns true for any of the elements in the array.

// Unicode - An unique number assigned to a character.
// Ex: String "h" is represented by a unicode as 68
// UTF-16 - Unicode - It encodes each unicode to 16 bits and stored in a memory. 
// For Unicode 68, 00000000 01101000 is the equivalent UTF-16 bits.
// Single UTF-16 code unit = 16 bits = 65536 possible values.

// JavaScript strings are encoded as a sequence of 16-bit numbers. These are called code units.
// A unicode character code was initially supposed to fit within such a unit (which gives you a little over 65,000
// characters). Unicode chars exceeded the 65k, many people dislike more memory per character.
// To address this concern UTF-16, the format also used by Js strings, was invented.
// 1. Most common characters using a single 16-bit code unit.
// 2. Others emojis, Rare historic symbols etc uses a pair of 16-bit code unit.

// Until the introduction of less common chinese characters and emojis, common english characters use one-code unit.
// It is easy to write programs that pretend code units and characters are the same thing.
// Example one emoji character in a string variable, length is 2, because these characters are two-unit code.

// Javascript strings, such as getting their length through the length property and accessing their content using
// square brackets, deal only with code units.

// Two emoji characters horse and shoe
let horeShoe = "🐴👟";
console.log(horeShoe.length); // 4
console.log(horeShoe[0]); // (Invalid half-character)
console.log(horeShoe.charCodeAt(0)); // 55357 (Code of the half-character) // high-surrogate pair unicode value
console.log(horeShoe.charCodeAt(1)); // 56372 (Code of the half-character) // low-surrogate pair unicode value
// UTF-16 stores strings as 16-bit units
// charCodeAt gives you the raw 16-bit number

console.log(horeShoe.codePointAt(0)); // Full unicode character, so we could use that to get characters from a string.

// Js charCodeAt method gives you a code unit, not a full character code.
// The codePointAt method, added later, does give a full Unicode character, so we could use that to get characters 
// from a string.

// But the argument passed to codePointAt is still an index into the sequence of code units.
// To run over all characters in a string, we'd still need to deal with the question of whether a character
// takes up one or two code units.

let roseDragon = "🌹🐉";

for (const char of roseDragon) {
    const code = char.codePointAt(0);
    console.log("char:", char, "code:", code);
};
// Using the for/of loop, it runs through the string by each character, not by code units.

// Recognizing text:
// We have a characterScript function - To return a script object that has specific unicode in the ranges.
// To correctly loop over characters - We have for/of loop.

// Next step:
// Goal is to count the characters that belong to each script. The below counting abstraction will be useful there:
function countBy(items, groupName) {
    console.log(items, groupName);

    const counts = [];

    for (const item of items) {
        const name = groupName(item);
        const known = counts.find(c => c.name == name);
        if (!known) {
            counts.push({ name, count: 1 });
        } else {
            known.count += 1;
        }
    }

    return counts;
}

console.log(countBy([1, 2, 3, 4, 5], n => n > 2)); // [{name: false, count: 2}, {name: true, count: 3}]

function textScripts(text) {
    // console.log("text:", text);

    let scripts = countBy(text, char => {
        // console.log("text:", text);
        // console.log("char:", char);

        let script = characterScript(char.codePointAt(0));
        return script ? script.name : "none";

    }).filter(({ name }) => name != 'none');

    let total = scripts.reduce((n, { count }) => count + n, 0);
    if (!total) return "No script found!";

    return scripts.map(({ name, count }) => {
        return `${Math.round((count * 100) / total)}% ${name}`;
    }).join(", ");
    // else return scripts;
}

console.log(textScripts(('英国的狗说"woof", 俄罗斯的狗说"тяв"')));

// From the above function, we found script name for the input arg. string using codePointAt method and characterScript,
// to find that range in the script, counted each script, filtered out script name which is none.
// To find percentage of scripts in the input string, total script can be find using reduce function, it returns a single value
// Finally the above function returns result by transforms an array counting entries into readable strings with map
// and combines them with join.  

// Exercises
// Flattening:
// Use Reduce method in combination with the concat method to "Flatten" array of arrays into a single array that has 
// all elements of the original arrays.

// let arr1 = [1, 2];
// let arr2 = [3, 4];
// let arr3 = [5, 6];

// console.log(arr1.concat(arr2, arr3));

let arrays = [[1, 2, 3], [4, 5], [6]];
console.log(arrays.reduce((n, arr) => n.concat(arr), [])); // [1, 2, 3, 4, 5, 6]

// Your own loop:
// for loop example:
// for (let i = 0; i < length; i++){
// body function
// }

function loop(start, test, update, body) {
    for (let value = start; test(value); value = update(value)) {
        body(value);
    }
}

console.log(loop(3, n => n > 0, n => n - 1, console.log));

// Everything
let array = [1, 2, 3, 4, 5];
console.log(array.every(n => n > 0));

// version - 01:
function every(array, test) {
    for (const element of array) {
        if (!test(element)) return false;
    }
    return true;
}

console.log(every([1, 2, 3, 4, 5], n => n > 0)); // true
console.log(every([2, 4, 16], n => n < 10)); // false
console.log(every([], n => n > 0)); // true

// Note:
// [].every(n => n > 0) // true
// No element breaks the rule
// “Check every element. If you find one bad element, return false.
// If you find no bad elements, return true.”

// [].some(n => n > 0) // false
// “Is there at least one element that matches the condition?”
// No element satisfies the rule

// version - 02:
// Using some method
function every2(array, test) {
    return !array.some(element => !test(element))
}

console.log(every2([1, 2, 3, 4, 5], n => n > 5));

// some method returns true, if any elements passes
// instead of finding that passes, look for an element that fails
// and then reverse the result.

// Dominant Writing direction:
function countByDirection(items, groupName) {
    // console.log(items, groupName);

    const counts = [];

    for (const item of items) {
        const direction = groupName(item);
        const known = counts.find(c => c.direction == direction);
        if (!known) {
            counts.push({ direction, count: 1 });
        } else {
            known.count += 1;
        }
    }

    return counts;
}

function dominantDirection(text) {

    let scripts = countByDirection(text, char => {
        let script = characterScript(char.codePointAt(0));

        return script ? script.direction : "none";
    }).filter(({ direction }) => direction != "none");

    if (scripts.length == 0) return "ltr";

    return scripts.reduce((a, b) => a.count > b.count ? a : b).direction;
}

console.log(dominantDirection("Hello!"));
console.log(dominantDirection("Hello!, مساء الخير"));