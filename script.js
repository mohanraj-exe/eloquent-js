// Callbacks
// Some operations takes time:

// 1. Reading a file.
// 2. Fetching data from the internet.
// 3. Waiting for a timer.
// 4. User clicking a button.

// Js cannot stop and wait for these, because that would freeze the program.

// So insted of waiting, Js says:
// "Start the work, and tell me what to do when it's done."
// That "What to do later" is the callback.

// A callback is: 
// A function you give to another function, to be called later.
// Not now
// Later.

// Why do we need a callbacks?
// Because some work is asynchronous, meaning: 
// It starts now
// It finishes later
// Js keeps running in the meantime.

// A callback is a function you give to another function, so it can be called later when an

function waitAndSayHello(callback) {
    console.log("Starts!");
    setTimeout(function () {
        console.log(callback({ username: 'Arun' }));
    }, 1000);
}

// waitAndSayHello(function ({ username }) {
//     return `Fetched data is: ${username}`;
// });

// Another example of a common asynchronous operation is reading a file from
// a device’s storage.

// Imagine you have a function readTextFile that reads a file’s
// content as a string and passes it to a callback function.

// Book example:
// readTextFile("shopping_list.txt", content => {
//     console.log(`Shopping list:\n ${content}`);
// });

// Shopping list:
// Peanut butter
// Bananas

function shopping(callback1, callback2, callback3) {

    setTimeout(() => {
        let cb1 = callback1("Peanut butter");
        setTimeout(() => {
            let cb2 = callback2("Banana");
            setTimeout(() => {
                callback3(cb1, cb2);
            }, 1000);
        }, 1000);
    }, 1000);

    return;
}

// console.log(shopping(function (item) { console.log(`${item} added to basket!`); return item; },
//     function (item) { console.log(`${item} added to basket!`); return item; },
//     function (item1, item2) { console.log(`Reached billing section: ${item1}, ${item2} costs 100 Rupees!`); }));


// PROMISES:
// A different way to build an asynchronous program is to have asynchronous functions return an object that
// represents its future result instead of passing around callback functions.
// This way, such functions actually return something meaningful, and the shape of the program closely resembles
// that of synchronous programs.

// A Promise is a receipt representing a value that may not be available yet.
// It provides a then method that allows you to register a function that should be called when the action for which
// it is waiting finishes. 

// When the promise is resolved, meaning its value becomes available, such functions are called with the result value.
let fifteen = Promise.resolve(15);

// console.log(fifteen);
// fifteen.then(value => console.log(`Got ${value}`));
// fifteen.then(value => console.log(`Squared value: ${value * value}`));

function textFile(filename) {
    return new Promise(resolve => {
        // readTextFile(filename, text => resolve(text));
    });
}

// textFile("plans.txt").then(console.log);

// ---------------------------------------
// Fetch example with Promise:
function specialFn() {
    return new Promise((resolve, reject) => {
        console.log("Fetching starts!");
        resolve(fetch('https://jsonplaceholder.typicode.com/users'));
    });
};

// let result = specialFn();
// console.log(result);

// result.then(response => response.json())
//     .then(r => console.log(r))
//     .catch(e => console.log(e));

// ---------------------------------------- 
function randomFile(listFile) {
    return textFile(listFile)
        .then(content => content.trim().split("\n"))
    // .then(ls => ls[Math.floor(Math.random() * ls.length)])
    // .then(filename => textFile(filename))
}

// #1 .then() returning a normal value
Promise.resolve(10)
    .then(x => x * 2)
// .then(result => console.log(result));

// #2 .then() returning a promise
Promise.resolve(10)
    .then(x => Promise.resolve(x * 2))
// .then(result => console.log(result));

// #3 .then() calling an async function
Promise.resolve(10)
    .then(async x => x * 2)
// .then(result => console.log(result));

// async functions always return a promise.
// Even though x * 2 is synchronous
// It is automatically wrapped in a promise.
// An async function inside .then() behaves exactly like returning a promise.

// #4 Async work inside .then()
Promise.resolve("file.txt")
    .then(async file => {
        let content = await textFile(file);
        return content.toUpperCase();
    })
// .then(result => console.log(result));

// FAILURE
// Promises makes this error handling easier.
// They can be either resolved (the action finished
// successfully) or rejected (it failed)

// Resolve handlers (as registered with then) are called only when the action is successful
// And rejections are propogated to the new promise by then.
// When a handler throws an exception, this
// automatically causes the promise produced by its then call to be rejected.

// Much like resolving a promise provides a value, rejecting one also provides
// a value, usually called the reason of the rejection.
// When an exception in a handler function causes the rejection, 
// the exception value is used as the reason.

// Similarly, when a handler returns a promise that is rejected, that rejection flows
// into the next promise.

// Promise.reject function that creates a new, immediately rejected promise.
// To explicitly handle such rejections, promise have a catch method that registers a handler to be called
// when the promise is rejected, similar to how then handlers handle normal resolution.

// Every .then() and .catch() creates and returns a NEW promise
Promise.resolve(10)
    .catch(err => 0)
// .then(value => console.log(value));

// #1 Promise.resolve(10) -> fulfilled with 10
// #2 .catch(...) -> Not executed (no error)
//                   passes the value through
// #3 The new promise resolves with the same value 10 (here the .then() returns a new promise with the value 10)

let p1 = Promise.reject("Invalid");
let p2 = p1.catch(err => err);

// console.log(p1); // state: rejected, value: "invalid"
// console.log(p2); // state: fulfilled because it returns a value, value: "invalid"

// console.log(Promise.reject("Not found").catch(err => err));

// As a Short-hand, then accepts a rejection handler as a second argument, so you can install
// both types of handlers in a single method call: .then(acceptHandler, rejectHandler) 

// Promise.reject("Internal server error")
// .then(value => console.log(value), err => console.log(err));

// Call-back style resolve, reject
function textFile1(filename) {
    return new Promise((resolve, reject) => {
        readTextFile(filename, (text, error) => {
            if (error) reject(error);
            else resolve(text);
        });
    });
}

// NOTE:
// A Promise state decides which handler runs, 
// and the handler's behavior decides what the next promise becomes.

// #1
Promise.resolve(100)
// .catch(err => console.log(err))
// .then(res => console.log(res));

// Here the promise outcome from the Promise.resolve is 'fulfilled and value is 10'
// So it chooses the promise handler .then() instead of .catch()

// Handler returns a value -> success next
// Promise.resolve(5)
// .then(v => v * 2) // returns value
// .then(console.log);

// Next step is success 

// #2
// Handler throws -> failure next
// Promise.resolve(200)
// .then(res => { throw new Error("oops") })
// .catch(err => console.log(err.message));

// Next step is failure.

// #3
// Handler returns a promise -> follow it
// Promise.resolve(5)
// .then(v => Promise.resolve(v * 2))
// .then(console.log);

// There are two different outcomes involved:

// #1 Promise outcome (before handler runs)
// fulfilled -> .then() matches
// rejected -> .catch() matches

// #2 Handler outcome (after handler runs)
// return value -> success
// throw error -> failure
// return promise -> adopt its result.

new Promise((_, reject) => reject(new Error("Fail")))
    .then(value => console.log("Handler 1:", value))
    .catch(reason => {
        // console.log("Caught failure:" + reason);
        return "nothing";
    })
// .then(value => console.log("Handler 2:", value));

// → Caught failure Error: Fail
// → Handler 2: nothing

// CARLA
// BREAKING IN

// joinWifi function
// Inputs to join wifi: Network name, Passcode (string)
// Returning a promise that resolves if successful and rejects if the authentication failed.
// First thing she needs is a way to wrap a promise so that it automatically rejects after it takes too much time,
// to allow the program to quickly move on if the access point doesn't respond.

function joinWifi(networkID, passcode) {
    // Assume carla already has a joinWifi function to connect access point(withoutTimeout)

    let actualPasscode = "555555";

    return new Promise((resolve, reject) => {
        if (passcode == actualPasscode) {
            resolve(passcode);
        }
        else if (passcode[passcode.length - 1] != actualPasscode[passcode.length - 1]) {
            reject(passcode);
        }
    });
}

function withTimeout(promise, time) {
    console.log(promise);
    // debugger;

    return new Promise((resolve, reject) => {
        promise.then(resolve, reject);
        // promise.then((value) => resolve(value), (err) => reject(err));
        setTimeout(() => {
            reject("Timed out")
        }, time);
    });
}

// This makes use of the fact that a promise can be resolved or rejected only once.
// If the promise given as its argument resolves or rejects first, that result will be the result of the 
// promise returned by withTimeout.

// Goal is to find the whole passcode, the program needs to repeatedly look for the next digit by trying each digit.
// If authentication succeeds, we know we have
// found what we are looking for. If it immediately fails, we know that digit was
// wrong and must try the next digit.

// console.log(withTimeout(Promise.resolve("Login successful"), 50));

// USING RECURSIVE FUNCTION
function crackPasscode(networkID) {
    function nextDigit(code, digit) {
        let newCode = code + digit;
        // console.log(newCode);
        // debugger;

        return withTimeout(joinWifi(networkID, newCode), 1)
            .then(() => `Passcode matched: ${newCode}`)
            .catch(failure => {
                if (failure == "Timed out") {
                    return nextDigit(newCode, 0);
                } else if (digit < 9) {
                    return nextDigit(code, digit + 1)
                } else {
                    throw `Found new error: ${failure}`;
                }
            });
    }
    return nextDigit("", 0);
}

// crackPasscode("HANGAR-2").then(console.log);

// Try -> "", 0;
// code = ""; digit = 0;
// newCode = "0";

// joinWifi and withTimeout returns a promise

// #joinWifi
// Promise state -> pending, value -> undefined
// if ("0" == "555555") // false
// else if ("0" != "5") // true
// Promise state -> 'rejected', reason -> "0"

// #withTimeout
// Promise state -> pending, value -> undefined
// promise.then(resolve, reject); // It is fulfilled/rejected promise.
// .then() registers handler function. // It will return a promise.
// .then() handler's function runs asychronously
// setTimeout() will fire next to it. Puts them in the macro-task queue.
// Before that promise.then(reject) gets fired because the promise is previously rejected.


async function crackPasscode1(networkID) {
    for (let code = ""; ;) {
        for (let digit = 0; ; digit++) {
            let newCode = code + digit;
            console.log(newCode);

            try {
                let result = await withTimeout(joinWifi(networkID, newCode), 50);
                console.log(result);
                return newCode;

            } catch (failure) {
                if (failure == "Timed out") {
                    code = newCode;
                    break;
                } else if (digit == 9) {
                    throw failure;
                }
            }
        }
    }
}

// crackPasscode1("HANGAR-3").then(console.log);

function pendingPromise(input) {
    return new Promise((resolve, reject) => {
        if (input == 0) {
            reject(input);
        } else if (input == 9) {
            resolve(input);
        }
    })
}

async function asyncSampleFn(p1) {
    try {
        // let resolvedPromise_val = await pendingPromise(p1);
        // console.log(resolvedPromise_val);
        // This console.log prints only if the above 'await' line of code resolved the promise, 
        // if promise gets rejected it enters the catch block;

        // return resolvedPromise_val;
        return Promise.reject("Not found!");
        // return p1;
    } catch (rejectedPromise_reason) {
        console.log(rejectedPromise_reason);
        throw rejectedPromise_reason;
    }
}

// console.log(asyncSampleFn(5).then(console.log, console.log));

async function demo() {
    console.log("A");

    await new Promise(r => setTimeout(r, 1000));

    console.log("B");
}

// console.log("START!");
// demo();
// console.log("END!");
// console.log("END!");

// GENERATORS

// This ability of functions to be paused and then resumed again is not exclusive
// to async functions. JavaScript also has a feature called generator functions.
// These are similar, but without the promises.

function* powers(n) {
    // debugger;
    console.log("Started running...");
    for (let current = n; ; current *= n) {
        yield current;
    }
}

// for (let power of powers(3)) {

//     if (power > 50) break;
//     console.log(power);
// }

// n = 3;
// current = 3;
// yielded 3;
// console.log(power); // 3

// After first yield/first iteration
// current = 3, n = 3;
// current = current * n;
// yielded 9;
// console.log(power); // 9

// After second yield/second iteration
// current = 9, n = 3;
// current = current * n;
// yielded 27;
// console.log(power); // 27

// After third yield/third iteration
// current = 27, n = 3;
// current = current * n;
// yielded 81;
// (81 > 50) break;

async function request(networkAddress, message) {
    // Network request simulation.
    try {
        // console.log(`Request for ${networkAddress} connection initiated...`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return message;
    } catch (error) {
        throw error;
    }
}

for (let addr = 1; addr < 256; addr++) {

    let data = [];
    for (let n = 0; n < 1500; n++) {
        data.push(n < addr ? 3 : 0);
    }

    let ip = `10.0.0.${addr}`;
    request(ip, { command: "display", data })
        .then(() => console.log(`Request to ${ip} accepted`))
        .catch(() => { });
}

// request();