import { JOURNAL } from "./JOURNAL.js";

// 04. Data structures - Objects and arrays.
// Properties

const myString = "helloWorld";
const x = 5;
// console.log(myString.length);
// console.log(myString[x]);

const arrayExample = [5, 6, 7, 8, 9, "helloWorld"];
// console.log(arrayExample["5"]);

// Almost all Js values have properties. The exception are null and undefined.
// If accessing property on any of these nonvalues will get an error.
// console.log(null.length); 
// → TypeError: null has no properties

// The two main ways to access properties in Js are with a dot and with square brackets.
// Both value.x and value[x] access a property on value - but not necessarily the same property.
// The difference is in how x is interpreted.

// When using a dot - The word after the dot is the literal name of the property.
// When using square brackets - The expression bw the brackets is evaluated to get the property name.

// Whereas value.x fetches the property of value named "x", value[x] takes the value of the variable named x
// and uses that, converted to a string, as the property name.

// Note: The elements in an array are stored as the array's properties using numbers as property names.
// Because you can’t use the dot notation with numbers and usually want to use a binding that holds the 
// index anyway, you have to use the bracket notation to get at them.

// Methods - Properties that contain functions are generally called methods of the value they belong to, 
// as in "toUpperCase is a method of a string".
// Both string and array values contain, in addition to the length property, a number of properties
// that hold function values.

let doh = "Doh";
// console.log(doh, typeof (doh)); // "Doh", string
// console.log(doh.toUpperCase, typeof (doh.toUpperCase)); // function toUpperCase(), function
// console.log(doh.toUpperCase(), typeof (doh.toUpperCase()));  // "DOH", string

let sequence = [1, 2, 3];
sequence.push(4);
sequence.push(5);
console.log(sequence);
sequence.pop();
console.log(sequence);

// The push method adds values to the end of an array.
// The pop method removes the last element/value in the array and returning it.
// These names are the traditional terms for operations on a stack.
// A stack is a data structure that allows you to push values into it and pop them out again in the opposite order.
// So that the thing that was added last it removed first. // Which resembles the idea of call stack from functions.

const obj = { apple: (x = "tastes good") => x }
const dohEx = {
    customUpperCaseFunction: function (x = "Doh") {
        let i = 0;
        let result = "";
        while (i < x.length) {
            result += x[i].toUpperCase();
            i++;
        }
        return result;
    }
};

// console.log(dohEx.customUpperCaseFunction());
// console.log(obj.apple());

// Weresquirrel
// A set of daily log entries can be represented as an array, but the entries do not consist of just number and strings.
// Each entry needs to store a list of activities and a boolean value that indicates whether Jacq turned into squirrel or not.
// We would like to group these together into a single value and put those grouped values into an array of log entries.

// Objects - Values of the type object are arbitrary collection of properties.
// One way to create an object is by using braces as an expression.

let day1 = {
    squirrel: false,
    events: ["work", "touched tree", "pizza", "running"]
};

// console.log(day1.squirrel);
console.log(day1.wolf);
day1.wolf = false;
console.log(day1.wolf);
// console.log(day1);

// Note: Properties whose names aren't valid bindings names or valid numbers must be quoted as below.
let descriptions = {
    work: "Went to work",
    "touched tree": "Touched a tree"
};

// console.log(descriptions["touched tree"]);

let prop = "age";
// const sampleFn = n => ({ prop: n }); // putting paranthesis around the object to make it clear that is an expression.
const sampleFn2 = n => { return { [prop]: n } }; // another/alternate way of returning the same result.
// console.log(sampleFn(10));
console.log(sampleFn2(10));

let anObject = { left: 1, right: 2 };
// console.log(anObject.left);

// delete anObject.left;
// console.log(anObject);
// console.log(anObject.left);
// console.log("left" in anObject);
// console.log("right" in anObject);

const sampleObject = { x: 0, y: 0, z: 10 };
// console.log(Object.keys(anObject));

let objectA = { a: 1, b: 2 };
Object.assign(objectA, { b: 3, c: 4 });

objectA.b = 30;
// console.log(objectA);

// Mutability:
// Numbers, Boolean, Strings are immutable - it is impossible to change the values of those types.
// If you take a specific string value, that value will always remains the same. The text inside it cannot be changed.
// If a variable have a string that contains "cat", it is not possible for other code to change a character in your string
// to make it spell "rat"

let object1 = { value: 10 };
let object2 = object1;
let object3 = { value: 10 };
// console.log(object1 === object2);
// console.log(object1 === object3);

object1.value = 15;
// console.log(object1);
// console.log(object1.value); // 15
// console.log(object2);
// console.log(object3);

// const score = { visitors: 0, home: 0 };
// score.visitors = 1;
// score = { visitors: 1, home: 0 };
// console.log("score:", score); // Uncaught typeError: invalid assignment to const 'score'

// Note: When using (==) or (===) operator to compare objects, it compares by identity.
// When two different objects of same contents, compared and returns false.

let journal = [];

function addEntry(events, squirrel) {
    // console.log("events, squirrel:", events, squirrel);
    journal.push({ events, squirrel })
}

// addEntry(true, false);

// Example:
// addEntry(["work", "touched tree", "pizza", "running", "television"], false);
// addEntry(["work", "ice cream", "cauliflower", "lasanga", "touched tree", "brushed teeth"], false);
addEntry(["weekend", "cycling", "break", "peanuts", "beer"], true);

// const [outcome] = journal;
// console.log(outcome);

// Computation correlation:
// 2 x 2 table in a Js

function phi(table) {
    return (table[3] * table[0] - table[2] * table[1]) /
        Math.sqrt((table[2] + table[3]) *
            (table[0] + table[1]) *
            (table[1] + table[3]) *
            (table[0] + table[2])
        );
}

// console.log(phi([76, 9, 4, 1])); // 0.0685 // 0.069 approx.

function tableFor(event, journal) {
    const table = [0, 0, 0, 0];
    for (let i = 0; i < journal.length; i++) {
        let entry = journal[i], index = 0;
        if (entry.events.includes(event)) index += 1;
        if (entry.squirrel) index += 2;
        table[index] += 1;
    }
    return table;
}

// console.log(tableFor("pizza", JOURNAL)); // [ 76, 9, 4, 1 ]

// Array loops using for of
// for (let entry of JOURNAL) {
//     console.log(`${entry.events.length} events.`);
// }

function journalEvents(journal) {
    let events = [];
    for (const entry of journal) {
        for (const event of entry.events) {
            if (!events.includes(event)) {
                events.push(event);
            }
        }
    }
    return events;
}

// console.log(journalEvents(JOURNAL));

// for (const event of journalEvents(JOURNAL)) {
//     console.log(event + ":", phi(tableFor(event, JOURNAL)));
// }

// Filter out:
for (const event of journalEvents(JOURNAL)) {
    const correlation = phi(tableFor(event, JOURNAL));
    if (correlation > 0.1 || correlation < -0.1) {
        console.log(event + ":", correlation);
    }
}

for (let entry of JOURNAL) {
    if (entry.events.includes("peanuts") && !entry.events.includes("brushed teeth")) {
        entry.events.push("peanut teeth");
    }
}
console.log(phi(tableFor("peanut teeth", JOURNAL)));

// Further arrayology:
// push, pop, unshift and shift

const toDoList = [];
// #01
function remember(task) {
    return toDoList.push(task);
}

remember("groceries"); // this function calls made pushing the argument to the end of an queue
// console.log(toDoList); // ["groceries"]

// #02
function getTask() {
    return toDoList.shift();
}

getTask(); // this function calls made removing a first element of a queue
// console.log(toDoList); // []

// #03
function rememberUrgently(task) {
    return toDoList.unshift(task);
}

rememberUrgently("Drive a car"); // this function calls made adding element to the front of a queue
console.log(toDoList); // ["Drive a car"]

// To search for a value in an array and return index of that element.
// Use indexOf

console.log([1, "a", 2, "b", 3].indexOf("a", 1)); // 1 // optional second argument that indicates where to start searching.
console.log([1, "a", 2, "b", 3].indexOf("c")); // Not found, So -1 is returned.
console.log([1, 2, 3, 2, 1].indexOf(2)); // 1
console.log([1, 2, 3, 2, 1].lastIndexOf(1)); // 4 // To search from the end instead of the start

console.log([0, 1, 2, 3, 4].slice(2, 4)); // [2, 3]
// it takes start and end indices and returns an array that has only the elements between them.
console.log([0, 1, 2, 3, 4].slice(2)); // [2, 3, 4] // The start index is inclusive and the end index is exclusive.

// concat and slice in action
function remove(array, index) {
    return array.slice(0, index).concat(array.slice(index + 1));
}

console.log(remove([1, 2, 3, 4, 5], 2));

// Strings and the properties
let kim = "Kim";
// kim.age = 20;
// console.log("kim:", kim.age);

console.log("coconuts".slice(4, 7)); // nut
console.log("coconuts".indexOf("u")); // 5
console.log("one two three".indexOf("ee")); // string's indexOf can search for a string containing more than one character.
console.log(" okay \n".trim());
console.log("6".padStart(3, "0"));
// or
console.log(String(6).padStart(3, "0"));

// String methods - Split and Join
const sentence = "The quick brown fox jumps over the lazy dogs";
const words = sentence.split(" ");
// console.log(words);
// We can split a string on every occurance of another string with split and join it again with join

console.log(words.join(". "));
// console.log("LA".repeat(3));

let string = "abc";
// console.log(string.length);
// console.log(string[1]);

// Rest parameters:
// function max(...numbers) {
//     console.log(numbers);
//     let result = -Infinity;
//     for (const number of numbers) {
//         if (number > result) result = number;
//     }

//     return result;
// }

// console.log(max(1,13,-9,4,11));

function max(...numbers) { // 'rest parameter'  
    console.log(numbers); // here packs arguments as an array.
    let result = -Infinity;
    for (const number of numbers) {
        if (number > result) result = number;
    }

    return result;
}

let numbers = [5, 1, 7];
console.log(max(...numbers)); // 'spread out' here array elements like this: 5 1 7
console.log(max(9, ...numbers, 2)); // 'combining with other arguments' // 9, 5, 1, 7, 2
// converted and passing as an individual arguments

const wordsArr = ["never", "fully"];
console.log(["will", ...wordsArr, "understand"]); // [ "will", "never", "fully", "understand" ]

const coordinates = { x: 10, y: 5 };
console.log({ ...coordinates, y: 10, z: 30 });

// Math object
console.log(Math.min(...numbers));
console.log(Math.max(...numbers));
console.log(Math.sqrt(100));
console.log(Math.random());
console.log(Math.floor(Math.random() * 10));
console.log(Math.ceil(Math.random() * 10));
console.log(Math.round(Math.random() * 10));
console.log(Math.abs(-Math.floor(Math.random() * 10)));

// Destructuring
function phiFn([n00, n01, n10, n11]) {
    // return console.log(n00, n01, n10, n11);

    return (n11 * n00 - n10 * n01) /
        Math.sqrt((n00 + n01) * (n10 + n11) * (n00 + n10) * (n01 + n11));
}

console.log(phiFn([76, 9, 4, 1])); // eating pizza, turning squirrel events.
// If you know that the value you are binding is an array, you can use square brackets to "look inside" of the value,
// binding its contents(above example) this applies to object as well.(refer below example)

const { car, location } = { car: "ferrari", location: "Italy" };
// console.log(car, location);

// Optional chaining operator
// When you aren’t sure whether a given value produces an object, but still want to read a property from it 
// when it does, you can use a variant of the dot notation: object?.property.

// 1. Accessing object properties: obj?.prop
function city(object) {
    return object.address?.["city"];
}

console.log(city({ address: { city: "uk" } })); // 'uk'

function cityEx1(object) {
    return object?.address?.college; // if not using '?.' optional chaining operator, we will get error.
}

console.log(cityEx1(null)); // undefined

// 2. Accessing properties with bracket notation: obj?.[expr]
const data = {
    items: [1, 2, 3]
};

console.log(data?.items?.[0]); // 1
console.log(data?.values?.[0]); // undefined (no error)
console.log({}.arrayProp?.[0]); // undefined

// 3. Calling methods: obj.method?.(args)
const calculator = {
    add: (a, b) => a + b
};

console.log(calculator?.add?.(2, 3)); // 5
console.log(calculator?.subtract?.(5, 2)); // undefined (no error)
console.log("string".notAMethod?.()); // undefined

// // Exercises
// Sum of a range
// #01. console.log(sum(range(1, 10)));

// Range 
// #02. Using for loop
// function range(start, end) {

//     let array = [];
//     for (let i = start; i <= end; i++) {
//         array.push(i);
//     }
//     return array;

// }

// #03. Using while loop
// function range(start, end) {

//     let i = start;
//     let array = [];

//     while (i <= end) {
//         array.push(i);
//         i++
//     }

//     // return array;
// }

// console.log(range(1, 10));

// #04. Sum function
function sum(numbers) {

    let result = 0;
    for (const number of numbers) {
        result += number;
    }

    return result;
};

console.log(sum(range(1, 10)));

// Bonus assignment
function range(start, end, step = start < end ? 1 : -1) {
    // console.log(step);

    let array = [];

    if (step > 0) for (let i = start; i <= end; i += step) array.push(i);
    else for (let i = start; i >= end; i += step) array.push(i);

    return array;

}

// console.log(range(1, 10));
// console.log(range(1, 10, 2));
console.log(range(5, 2, -1));

// #05. Reversing an array.
function reverseArray(arr) {
    let result = [];

    for (let i = arr.length - 1; i >= 0; i -= 1) {
        result.push(arr[i]);
    }

    return result;
}

// using unshift array method
// function reverseArray(arr) {
//     let result = [];

//     for (let i = 0; i < arr.length; i += 1) {
//         result.unshift(arr[i]);
//     }

//     return result;
// }

console.log(reverseArray([1, 2, 3]));

function reverseArrayInPlace(arr) {

    for (let i = 0; i < Math.floor(arr.length / 2); i += 1) {
        let current = arr[i];
        // console.log("current:", current, "arr[i]:", arr[i]);

        arr[i] = arr[(arr.length - 1) - i];
        arr[(arr.length - 1) - i] = current;
    }

    return arr;
}

console.log(reverseArrayInPlace([1, 2, 3, 4, 5]));

// #06. A list
let list = { value: 3, rest: null };
let secondList = { value: 2, rest: list };
let thirdList = { value: 1, rest: secondList };

// console.log("list:", list);
// console.log("secondList:", secondList);
// console.log("thirdList:", thirdList);

// #07. Array to list
function arrayToList(array) {
    let list = null;
    for (let i = array.length - 1; i >= 0; i -= 1) {
        list = { value: array[i], rest: list };
    }

    return list;
};

console.log(arrayToList([10, 20])); // { value: 10, rest: { value: 20, rest: null }} ;
// From iteration 1: { value: 20, rest: null }
// From iteration 2: { value: 10, rest: { value: 20, rest: null }}

// function List to array
function listToArray(list) {
    let arr = [];

    for (let node = list; node; node = node.rest) {
        // console.log("node:", node);
        arr.push(node.value);
    };

    return arr;
};

console.log("list to array:", listToArray(arrayToList([10, 20, 30])));


// function prepend(element, list) {
//     // console.log(element, list);

//     const listToArrayFnResult = listToArray(list);
//     listToArrayFnResult.unshift(element);
//     // console.log(listToArrayFnResult);

//     const arrToListFn = arrayToList(listToArrayFnResult);
//     // console.log(arrToListFn);

//     return arrToListFn;
// }

// Alternate prepend solution
function prepend(element, list) {
    return { value: element, rest: list };

    // or 
    // return { value, rest: list };
    // when parameter and property name is same.
}

// console.log(prepend(10, arrayToList([20]))); // { value: 10, rest: { value: 20, rest: null }}
console.log(prepend(10, prepend(20, null))); // { value: 10, rest: { value: 20, rest: null }}

// !Important. The above two function calls gives the same result.

// function nth(list, index) {
//     // console.log(list, index);

//     const listToArrayFnResult = listToArray(list);
//     // console.log(listToArrayFnResult);

//     return listToArrayFnResult[index];
// };

// Alternate solution:
// function nth(list, n) {
//     for (let index = 0; list !== null; index += 1) {
//         if (index === n) return list.value;

//         list = list.rest;
//     }

//     return undefined;
// }

// using recursion:
function nth(list, n) {
    if (!list) return undefined;
    else if (n === 0) return list.value;
    else return nth(list.rest, n - 1);
}

console.log(nth(arrayToList([10, 20, 30]), 2));

// Deep comparison
let obj1 = { name: 'john', age: 20 };
let obj2 = { name: 'john', age: 20 };
let obj3 = { here: { is: "an" }, object: 2 };

let var1 = 20;
let var2 = 20;

function deepEqual(a, b) {

    if (a === b) return true;

    if (a === null || typeof (a) !== "object" ||
        b === null || typeof (b) !== "object") return false;

    let keysA = Object.keys(a), keysB = Object.keys(b);
    console.log("keysA:", keysA);
    console.log("keysB:", keysB);

    if (keysA.length !== keysB.length) return false;

    for (let key of keysA) {
        console.log("key:", key);
        // console.log(keysB.includes(key));
        // console.log(a[key], b[key]);

        if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
    }

    return true;
}

// console.log(deepEqual(obj1, obj1));
// console.log(deepEqual(obj1, { name: 'john', age: 20 }));
console.log(deepEqual(obj3, { here: { is: "an" }, object: 2 }));

// console.log(deepEqual(var1, var2));
