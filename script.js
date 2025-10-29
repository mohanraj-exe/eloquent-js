// Defining a function:
// A function definition is a regular binding where the value of the binding is a function.
// For example this code defines square to refer a function that produces the square of a given number.

const squareFn = function (x) {
    return x * x;
};

console.log(squareFn(8));

// Function parameters:
// A function can have multiple parameters or no parameters at all.
// Example:
const makeNoise = function () {
    console.log("Pling!");
};

makeNoise(); // Pling!
// Whose only result is a side-effect (Prints text to a output device here in the browser)

// A function with multiple parameters
const roundTo = function (n, step) {
    let remainder = n % step;
    return n - remainder + (remainder < step / 2 ? 0 : step);
};

console.log(roundTo(23, 10)); // 20
// Return statement determines the value the function returns.
// Note: Functions that don't have return statement, it simply returns undefined.

// Bindings and scopes:
// Each binding has a scope, which is the part of the program in which the binding is visible.
// For bindings defined outside of any function, block or module, the scope is the whole program,
// you can refer to such bindings wherever you want. These are called global.

// Local bindings:
// Bindings created for function parameters or declared inside a function can be referenced only in that function,
// So they are known as local bindings. 

// Pre-2015 Js:
let x = 10; // global
if (true) {
    console.log("x:", x); // x is visible inside the block in the example
    let y = 20; // local to block
    var z = 30; // also global
}
// Each scope can "look out" into the scope around it, so x is visible inside the block in the example.
// The exception is when multiple bindings have the same name—in that case, 
// code can see only the innermost one. 

// Example:
const halve = function (n) {
    return n / 2;
};

let n = 10;
console.log(halve(100)); // 50
console.log(n);

// Nested scope:
// Js distinguishes not just global and local bindings. Blocks and functions can be created inside
// other blocks and functions, producing multiple degrees of locality.

const hummus = function (factor) {
    const ingredient = function (amount, unit, name) {
        let ingredientAmount = amount * factor;
        if (ingredientAmount > 1) {
            unit += 's';
        }

        console.log(`${ingredientAmount} ${unit} ${name}`);
    };

    ingredient(1, "can", "chickpeas");
    ingredient(0.25, "cup", "tahini");
    ingredient(0.25, "cup", "lemon juice");
    ingredient(1, "clove", "garlic");
    ingredient(2, "tablespoon", "olive oil");
    ingredient(0.5, "teaspoon", "cumin");
};

// The code inside the ingredient function can see the factor binding from the outer function, but its local bindings,
// such as unit or ingredientAmount are not visible in the outer function.

// The set of bindings visible inside a block is determined by the place of that block in the program text.
// Note: Important: Each local scope can also sell all the local scopes that contain it, and all scopes can see the
// global scope. This approach to binding visibility is called "Lexical scoping".

// Functions as values:
// A function binding usually simply acts as a name for a specific piece of the program.
// A function value can do all things that other values can do-you can use it in arbitrary expression, not just
// call it. It is possible to store a function value in a new binding, pass it as an argument to a function and so on.
// Similarly, a binding that holds a function is still just a regular binding and can, if not constant, be assigned
// a new value, like so:

let launchMissiles = function () {
    missileSystem.launch("now");
};

// if (safeMode) {
//     launchMissiles = function () {/* do nothing */ };
// }

// Declaration notation:
console.log("The future says:", future());

function future() {
    return "You will never flying cars";
}

// The above code works, even though the function is defined below the code
// that uses it. Function declarations are not part of the regular top-to-bottom
// flow of control. They are conceptually moved to the top of their scope and can
// be used by all the code in that scope. 


// The call stack

// not in function
function greet(who) { // in greet
    console.log("Hello", who); // in console.log // Step-02: The function calls console.log which takes control, does its job. Returns control to line-02.
} // in greet

greet("Harry!"); // not in function // Step-01: call to greet causes control to jump to the start of that function. (line-02)
// Step-03: It reaches the end of greet function, so it returns to the place that called it-line-04.
console.log("Bye!"); // in console.log
// not in function

// Because a function has to jump back to the place that called it when it returns,
// the computer must remember the context from which the call happened. In
// one case, console.log has to return to the greet function when it is done. In
// the other case, it returns to the end of the program.
// The place where the computer stores this context is the call stack. Every
// time a function is called, the current context is stored on top of this stack.
// When a function returns, it removes the top context from the stack and uses
// that context to continue execution.

// optional parameters
function square(x, y, z, a) {
    return console.log(a);
}

square(4, true, 'hedgedog');

// --------------------------------------

// Closure:
// Being able to reference a specific instance of local binding in an enclosing scope-is called a closure.
// A function that references bindings from local scope around it is called a closure.

// Example:
// function wrapValue(n) {
//     let local = n;
//     return () => local;
// }

// const wrap1 = wrapValue(1);
// const wrap2 = wrapValue(5);
// console.log(wrap1());
// console.log(wrap2());

// also the above function can written this way.

function wrapValue(n) {
    return () => n;
}

const wrap1 = wrapValue(1);
const wrap2 = wrapValue(2);

console.log(wrap1());
console.log(wrap2());

// A good mental model is to think of function values as containing both the code in their body and the
// environment which is created. When called, the function body sees the environment in which it was created, 
// not the environment in which it is called.

// In the below example, multiplier is called and creates an environment in which its factor parameter is bound to 2.
// The function value it returns, which is stored in twice, remembers this environment so that when that is called, it
// multiplies its argument by 2.

function multiplier(factor) {
    return number => number * factor;
};

let twice = multiplier(2);
console.log(twice(5));

function outer() {
    let a = 10;

    function inner() {
        return a;
    }

    return inner;
}

let fn = outer();
console.log(fn());

// Recursion
function power(base, exponent) {
    if (exponent === 0) {
        return 1;
    } else {
        return base * power(base, exponent - 1);
    }
}

const result = power(2, 3);
console.log(result);

// Recursion example - 2
// function findSolution(target) {
//     function find(current, history) {
//         if (current === target) {
//             return history;
//         } else if (current > history) {
//             return null;
//         } else {
//             find(current + 5, `(${history} + 5)`) ?? find(current * 3, `(${history} * 3)`)
//         }
//     }

//     return find(1, "1");
// }

// console.log(findSolution(13));

// Growing functions - topic
// Print farm inventory
// Example - 001

function printFarmInventory(cow, chicken) {
    let cowString = String(cow) || `${cow}`;

    while (cowString.length < 3) {
        cowString = "0" + cowString;
    }
    console.log(cowString + ' ' + 'Cow');

    let chickenString = String(chicken) || `${chicken}`;

    while (chickenString.length < 3) {
        chickenString = "0" + chickenString;
    }
    console.log(chickenString + ' ' + 'Chicken');
}

// printFarmInventory(7, 13);

// Example - 002
function printZeroPaddedWithLabel(number, label) {
    let numberString = String(number);

    while (numberString.length < 3) {
        numberString = "0" + numberString;
    }
    console.log(`${numberString} ${label}`);
}


function printFarmInventoryEx02(cow, chicken, pig) {
    printZeroPaddedWithLabel(cow, 'Cows');
    printZeroPaddedWithLabel(chicken, 'Chicken');
    printZeroPaddedWithLabel(pig, 'Pigs');
}

printFarmInventoryEx02(7, 13, 5);

// Example - 003
function zeroPad(number, width) {
    let string = String(number);

    while (string.length < width) {
        string = "0" + string;
    }

    return string;
}


// function printFarmInventoryEx03(cow, chicken, pig) {
//     console.log(`${zeroPad(cow, 3)} Cows`);
//     console.log(`${zeroPad(chicken, 3)} Chicken`);
//     console.log(`${zeroPad(pig, 3)} Pigs`);
// }

// printFarmInventoryEx03(7, 13, 5);

// Functions - exercise programs
// 01. Find Min
function min(a, b) {
    return a <= b ? a : b;
}

// console.log(min(12, 12));

// 02. Recursion
function isEven(n) {
    if (n === 0) return true;
    else if (n === 1) return false;
    else if (n < 0) return isEven(-n);
    else return isEven(n - 2);
}

// console.log(isEven(50));
// console.log(isEven(45));
// console.log(isEven(-1));

// 03. Bean counting
function countChar(string, ch) {

    let count = 0;
    let i = 0;
    // console.log("ch:", ch);
    // console.log("string:", string);

    while (i < string.length) {
        console.log(string[i], typeof (string[i]));

        if (string[i] === ch) {
            count += 1;
        }
        i++;
    }
    return count;
}

// function countBs(string) {
//     return countChar(string, "B");
// }

// console.log(countBs("BDB"));
// console.log(countChar("theQuickBrownFoxJumpsOverTheLazyDogs", "o"));