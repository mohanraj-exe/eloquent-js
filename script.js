// In Js, objects as containers that hold other data.
// In programming culture, Object-oriented programming is a set of techniques that use objects as the
// central principle of program organization.

// Methods
// In Js, methods are nothing more than properties that hold function values. This is a simple method:

function speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
};

let whiteRabbit = { type: "white", speak };
let hungryRabbit = { type: "hungry", speak };

whiteRabbit.speak("Oh my fur and whiskers!");
hungryRabbit.speak("Got any carrots?");

// When a function is called as method - looked up as a property and immediately called, as in object.method() - the binding
// called 'this' in its body automatically points at the object on which it was called.

// (or)

// When you call a function as a method, (like object.method()) the object before the dot (object) 
// becomes the value of (this) inside that function. 

// Inside speak(),
// this = whiteRabbit 
whiteRabbit.speak("Hi"); // The white rabbit says 'Hi'

// You can think of this as an extra paramter, that is passed to a function in a different way than regular parameters.
// If you want to provide it explicitly, you can use a function's call method, which takes the 'this' value as
// its first argument and treats further arguments as normal parameters.
speak.call(whiteRabbit, "Hurry"); // The white rabbit says 'Hurry'

// function hello(name){
//     return this.name;
// };

// console.log(hello('John')); // "name" this is undefined

// Arrow functions are different - they do not bind their own 'this' but can see the 'this' binding of the scope 
// around them.

let finder = {
    // find: function (array) {
    //     return array.some(v => v == this.value);
    // },
    find(array) {
        return array.some(v => v == this.value);
    }, // short-hand way of writing a method.
    value: 5
};

console.log(finder.find([4, 5])); // true

// If some called with function keyword instead of arrow function.
let finderEx = {
    find(array) {
        return array.some(function (v) { // Create its own 'this'
            return v == this.value;
        })
    },
    value: 5
};

// console.log(finderEx.find([4, 5])); 
// Can't access property "value", this is undefined.

function rabbitHelper(type) {
    return { type, speak };
};

console.log(rabbitHelper("Grey").speak("Any peanuts left?"));

// When creating 'N' number of rabbits, each returns an object that has properties it refers to methods
// if having more methods, creating each new rabbit gets all methods, it is unnecessary and repetitive.
// In Js, Prototypes shares methods for objects. Object containing methods can be shared, memory efficient, not
// repetitive work for the computer to do.

let empty = {}; // empty object linked to Object.prototype internally, it has prototypes for objects.
console.log(empty.toString); // → function toString()…{}
console.log(empty.toString()); // [object Object]
console.log(Object.prototype); // Object {...} 
// This is an object called Object.prototype, and it is the most basic prototype, 
// that all objects have by default. The prototype of Object.prototype is null, so it's at the 
// end of the prototype chain.
console.log(Object.getPrototypeOf(Object.prototype)); // null
console.log(Object.getPrototypeOf(rabbitHelper("Black")) === Object.prototype); // Object {...} === Object {...} // true

// The prototype of an object is not always Object.prototype. Try this:
const myDate = new Date();
let object = myDate;
// console.log(object);
// console.log(typeof(object));

do {
    object = Object.getPrototypeOf(object);
    console.log(object, typeof (object));
} while (object);

// Date.prototype
// Object { }
// null

// Prototype of myDate Object is -> Date.prototype object
// Prototype of Date.prototype is -> Object { }
// Prototype of Object { } is -> null // So it's at the end of the prototype chain.

let myDate2 = new Date();
console.log(myDate2.getDate()); // Calling a method that is defined on Date.prototype.

// Shadowing properties
// Giving the same name for a property as defined in the object's prototype.
let myDate3 = new Date(1995, 11, 17);
console.log(myDate3.getTime());

myDate3.getTime = function () {
    console.log('Something else!');
};

myDate3.getTime(); // Something else! 
// This should be predictable, given the description of the prototype chain.
// The browser first looks in myDate3 for a property with that name, and only checks the prototype if myDate3 does not
// define it.

// Setting a prototype
// In two-ways we can acheive it.
// Using Object.create()
// Using a constructor

const personPrototype = {
    greet() {
        console.log('Say hello!');
    }
}

const carl = Object.create(personPrototype); // It creates a new object with personPrototype as its prototype.
console.log(carl);
carl.greet(); // Now we can call greet() on the new object, and the prototype provides its implementation.

console.log(Object.getPrototypeOf(Math.max) == Function.prototype); // true
console.log(Object.getPrototypeOf([]) == Array.prototype); // true

let myFn = Math.max;
do {
    myFn = Object.getPrototypeOf(myFn);
    console.log(myFn);
}
while (myFn);

// function()
// Object { }
// null

// Using Object.create we can create a new object with a specific prototype.

let protoRabbit = {
    speak(line) {
        return `The ${this.type} rabbit says ${line}`;
    },
    jump(height) {
        return `The ${this.type} rabbit jumps ${height} feet in height`;
    }
};

let blackRabbit = Object.create(protoRabbit);
blackRabbit.type = "Black";
console.log(blackRabbit);

blackRabbit.speak("I am fear and darkness!");
blackRabbit.jump(2);

let greenRabbit = Object.create(protoRabbit);
greenRabbit.type = "Green";
greenRabbit.speak("I need a pineapple!");

// Classes:
// Js's prototype system can be interpreted as a somewhat free-form take on abstract data types or classes.

// Example:
function makeRabbit(type) {
    let rabbit = Object.create(protoRabbit);
    rabbit.type = type;
    return rabbit;
}

let orangeR = makeRabbit("orange");
console.log(orangeR.speak("I am papaya!"));
console.log(makeRabbit("orange").speak("I am papaya!"));

// Js's class notation makes it easier to define this type of function, along with a prototype object.
class Rabbit {
    constructor(type) {
        this.type = type;
    }
    speak(line) {
        console.log(`The ${this.type} rabbit says '${line}'`);
    }
}
console.log(typeof (Rabbit));

// 1. The class keyword starts class declaration, which allows us to define a constructor and a set of methods together.
// 2. Any number of methods may be written inside the declaration's braces.
// 3. This code has the effect of defining a binding called Rabbit, which holds a function that runs the code in 
// constructor and has a prototype property that holds the speak method.
// 4. This cannot be called like normal function, constructor in Js is called with new keyword in front of them.
// 5. Doing so creates a fresh instance of object whose prototype is the object from the function's prototype property,
// then runs the function with 'this' bound to the new object, and finally returns the object.

const tinyRabbit = new Rabbit("Tiny");
tinyRabbit.speak("I am the smallest!");

// Class introduced in 2015
// Any function can be used as a constructor and before 2015, the way to define a class was to write 
// a regular function and manipulate its prototype property.

function ArchaicRabbit(type) {
    this.type = type;
};

ArchaicRabbit.prototype.speak = function (line) {
    return `The ${this.type} rabbit says '${line}'`;
};

ArchaicRabbit.prototype.toString = function () {
    return `a ${this.type} rabbit`
}

let oldSchoolRabbit = new ArchaicRabbit("Old school");
console.log(oldSchoolRabbit.speak("I am the oldest!"));

console.log(String(oldSchoolRabbit));
console.log(Object.getPrototypeOf(oldSchoolRabbit));

// ---------------------------------------------------

function Dog() { };

Dog.prototype.bark = function () {
    console.log("woof");
}

let d = new Dog();
d.bark();

// console.log(Dog); 
// Dog is a constructor function, having a prototype property that holds prototype used for object instances.

// console.log(Dog.prototype);
// It is the constructor function's prototype property that will be assigned to object instances created by new Dog()

// console.log(d);
// It is an instance object created by new Dog(), having hidden prototype created by constructor function.

console.log(Object.getPrototypeOf(d));
// The instance of an object gets prototype of Constructor's function prototype property.

// console.log(d.toString());
// The instance object does not have a toString() method, so it search in its prototype chain.

console.log(Dog.prototype == Object.getPrototypeOf(d)); // true
console.log(Object.getPrototypeOf(Dog)); // Function.prototype
console.log(Object.getPrototypeOf(Dog) == Function.prototype); // function // true
console.log(Object.getPrototypeOf(tinyRabbit) == Rabbit.prototype); // Object {...} // true

// Constructors will typically add some per - instance properties to this.It is also
// possible to declare properties directly in the class declaration. Unlike methods,
// such properties are added to instance objects and not the prototype.

class Particle {
    speed = 10; // it is per-instance property like this.position below.
    // it is possible to declare properties directly in the class declaration.
    constructor(position) {
        this.position = position;
    };
    twice() {
        return this.speed ** this.position;
    }
}

// console.log(Particle);
let newParticle1 = new Particle(10);
console.log(newParticle1.twice());

let newParticle2 = new Particle(20);
// console.log(newParticle2);
console.log(newParticle2.twice());

// Like function, class can be used both in statements and in expressions.
// Above code class Particle is a statement, below class expression is assigned to an obj variable. 
// When used as an expression, it doesn't define a binding but just produces constructor as a value.
// You are allowed to omit the class name in a class expression.
let obj = class { };
console.log(obj, typeof (obj));

let object1 = new class { getWord() { return "Hello world!"; } };
console.log(object1.getWord());

// Private properties:

class SecretiveObject {
    #getSecret() {
        return "I ate all the plums";
    }

    interrogate() {
        let shallISayIt = this.#getSecret();
        return "never";
    }
};

let output = new SecretiveObject();
// console.log(output.#getSecret()); reference to undeclared private field or method #getSecret

class Race {
    #winner;
    constructor(person) {
        this.#winner = person;
    }

    winner() {
        return `Congratulations ${this.#winner}!`;
    }
}

let p1 = new Race("Max");
// console.log(p1);
console.log(p1.winner());

class RandomSource {
    #max;
    constructor(max) {
        this.#max = max;
    };

    getNumber() {
        return Math.floor(Math.random() * this.#max);
    }
}

let result = new RandomSource(10);
console.log(result.getNumber());


// Overriding Derived properties:
let killerRabbit = new Rabbit("killer");
Rabbit.prototype.teeth = "small";

// console.log(killerRabbit);
console.log(killerRabbit.teeth); // small

killerRabbit.teeth = "long, sharp and bloody";
console.log(killerRabbit.teeth); // long, sharp and bloody

console.log(new Rabbit("basic").teeth); // small

console.log(Rabbit.prototype.teeth); // small
console.log(killerRabbit.teeth); // long, sharp and bloody

// Instance created using constructor's function has generic prototype properties.
// If we want one instance property on the same name of prototype's property, we can override that, it is specific
// to that instance.

// Overriding is also used to give the standard function and array prototypes a different toString method than the basic
// object prototypes.

Object.prototype.toString // it gives [object Object]
Array.prototype.toString // the array override the generic toString from Object.prototype so they can show a more
// useful string instead of [object Object]

console.log(Array.prototype.toString == Object.prototype.toString); // false
console.log([1, 2].toString()); // 1,2 // Array overrides the more generic Object.prototype

console.log(Object.prototype.toString([1, 2])); // [object Object]

// Method call:
// A method call has this shape.
// object.method()
// arr.toString()

// toString is looked up as property of arr
// Js automatically sets this = arr;

// So this is a method call, because:
// The function is called through an object.

// Normal function call:
// functionName()
// or
// someFunction()

// console.log(Object.prototype.toString([1, 2]));
// Here:

// You're not calling it through an object.
// You're just calling a plain function reference.
// Js does not automatically sets this to [1, 2]

console.log(Object.prototype.toString.call([1, 2])); // [object Array]
// this = [1, 2];

console.log(Object.getPrototypeOf([])); // Array []

// Map:
// It is a data structure that associates values (the keys) with other values.
// For example, you might want to map names to ages. It is possible to objects for this.

let ages = {
    Boris: 39,
    Liang: 22,
    Julia: 62
};

console.log(`Julia is ${ages["Julia"]}`); // Julia is 62
console.log("Is Jack's age known?", "Jack" in ages); // "Is Jack's age known?" false
console.log("Is toString's age known?", "toString" in ages); // "Is toString's age known?" true

// Here we didn't list anybody named toString in our map.
// Yet because plain objects derive from Object.prototype, it looks like prototype is there.
// For this reason, using plain objects as maps is dangerous. There are several ways to avoid this problem.
// First, you can create objects with no prototype. 
// If you pass null to Object.create, the resulting object will not derive from Object.prototype and can be safely used as 
// a map.

console.log("toString" in Object.create(null)); // false

// Object property name must be strings. 
// If you need a map whose keys can't easily be converted to strings - such as objects - you cannot use an object as your map.
// Using class called Map that is written for this exact purpose. It stores a mapping and allows any type of keys.

let ages1 = new Map();
console.log(ages1, typeof (ages1));

ages1.set("Lando", 26);
ages1.set("Oscar", 28);
ages1.set("Max", 28);

console.log(`Lando is ${ages1.get("Lando")}`); // Lando is 26
console.log("Is Lewis age known?", ages1.has("Lewis")); // Is Lewis age known? false
console.log(ages1.has("toString")); // false

// The methods set, get, and has are part of the interface of the Map object.
// If you do have a plain object that need to treat as a map for some reason.
// It is useful to know that Object.keys returns only an object's own keys, not those in the prototype.
console.log(Object.keys(ages));

// Object.keys(obj2) - Only the object's own keys
let obj2 = { x: 1 };
console.log(Object.keys(obj2)); // ["x"]
// Even though obj2 can access things like toString, they are not included because:
// toString comes from object.prototype
// Not from obj itself
// Object.keys ignores prototype properties.

// Plain objects - It derive from Object.prototype, it looks like the property is there. (toString())
console.log("Is toString's age known?", "toString" in ages); // "Is toString's age known?" true

// As an alternative to the 'in' operator, you can use the Object.hasOWn function, which ignores the object's prototype.
console.log(Object.hasOwn({ x: 1 }, "x")); // true
console.log(Object.hasOwn({ x: 1 }, "toString")); // false

// Polymorphism:
// Polymorphism in Js means the same function or method name can be behave differently depending on the object that calls it.
Rabbit.prototype.toString = function () {
    return `a ${this.type} rabbit`
}

console.log(String(killerRabbit));
console.log(Object.getPrototypeOf(killerRabbit));

Array.prototype.forEach.call({ length: 2, 0: "A", 1: "B" }, elt => console.log(elt));

// Getters, Setters and Statics
// Interfaces often contain plain properties, not just methods. For example, Map
// objects have a size property that tells you how many keys are stored in them.

let sampleMap = new Map();
sampleMap.set("name", "George");
// console.log(sampleMap);
// console.log(sampleMap.size);

// It is not necessary for such an object to compute and store such an property directly in the instance.
// Even properties that are accessed directly may hide a method call. Such methods are called getters and are
// defined by writing get in front of the method name in an object expression or class declaration.
let varyingSize = {
    get size() {
        return Math.floor(Math.random() * 100);
    }
};

console.log(varyingSize.size); // 73
// console.log(varyingSize.size); // 89

// Whenever someone reads from this object's size property, the associated method is called.
// Similar thing when a property is written to, using a setter.

class Temperature {
    constructor(celsius) {
        this.celsius = celsius;
    }

    get fahrenheit() {
        return this.celsius * 1.8 + 32;
    }

    set fahrenheit(value) {
        this.celsius = (value - 32) / 1.8;
    }

    measure() {
        return `This temp. heat ${this.celsius} can be measured using 'Thermometer' and fahrenheit is ${this.fahrenheit}`
    }

    static fromFahrenheit(value) {
        return new Temperature((value - 32) / 1.8);
    }
}

let temp = new Temperature(22);
console.log(temp);
// console.log(temp.celsius);
// console.log(temp.measure());
console.log(temp.fahrenheit);

temp.fahrenheit = 86;
// console.log(temp.celsius);

// console.log(Object.getPrototypeOf(temp));
console.log(Temperature);
console.log(Temperature.prototype);
console.log(Temperature.fromFahrenheit(100));

// new Temperature(22); and console.log(Temperature.fromFahrenheit(100)); both returns an Temperature object just through
// different entry points.

// static methods → belong to the class itself
// Do not use instance data.
// Are often used to create objects in alternative ways.

// Inside a class declaration, methods or properties that have static written
// before their name are stored on the constructor.
// For example, the Temperature
// class allows you to write Temperature.fromFahrenheit(100) to create a tem-
// perature using degrees Fahrenheit.

let boil = Temperature.fromFahrenheit(212);
console.log(boil.celsius);

// Symbols:
// for...of works on many types because they all follow a common rule (an interface). 
// Arrays and strings already follow that rule. 
// You can make your own objects follow it too, but to understand how, you first need to understand Symbols.

let obj3 = { "length": 3 };
console.log(obj3.length === obj3["length"]); // To avoid name collisions, Js introduced Symbols
console.log(Object.getPrototypeOf(obj3));

console.log(obj3 == obj3); // same memory location, objects in js compare by references not by value.
console.log(obj3 == { "length": 3 });

// Most properties, including all those we have seen so far, are named with strings.
// But it is also possible to use symbols as property names.
// Symbols are values created with the Symbol function. Unlike strings, newly created symbols are unique - you cannot 
// create the same symbol twice.

let sym = Symbol("name");
console.log(sym); // Symbol("name")
console.log(sym == Symbol("name")); // false
console.log(typeof (sym)); // symbol

Rabbit.prototype[sym] = 55;
console.log(Object.getPrototypeOf(killerRabbit));
console.log(killerRabbit[sym]);

// Being both unique and usable as property names makes symbols suitable
// for defining interfaces that can peacefully live alongside other properties, no
// matter what their names are.

const length = Symbol("length");
Array.prototype[length] = 0;

// console.log(Array.prototype);
// console.log([1, 2].length); // 2
// console.log([1, 2][length]); // 0

// Alternate example
const secret = Symbol("secret");
Array.prototype[secret] = "from prototype";
// console.log(Array.prototype);


let a = [10, 20];
// console.log(a[secret]);

let myTrip = {
    length: 3,
    0: "Abu Dhabi",
    1: "Qatar",
    [length]: 5300
};

console.log(myTrip[length], myTrip.length);


// The Iterator Interface
// The object given to a for/of loop is expected to be iterable.
// This means it has a method named with the Symbol.iterator symbol.

// When called, that method should return an object that provides a second interface, iterator.
// This is the actual thing that iterates. 
// It has a next method that returns the next result.
// That result should be an object with a value
// property that provides the next value, if there is one, and a done property
// which should be true when there are no more results and false otherwise.

let okIterator = "OK"[Symbol.iterator]();
console.log(okIterator.next()); // {value: "O", done: false}
console.log(okIterator.next()); // {value: "K", done: false}
console.log(okIterator.next()); // {value: undefined, done: true}


// Let's implement an iterable data structure similar to Linked list. We'll write the list as a class this time. 

// from chap-04
// let list = { value: 1, rest: { value: 2, rest: { value: 3, rest: null }}}; 

class List {
    constructor(value, rest) {
        this.value = value;
        this.rest = rest;
    }

    get length() {
        return 1 + (this.rest ? this.rest.length : 0);
    }

    static fromArray(array) {
        let result = null;
        for (let i = array.length - 1; i >= 0; i--) {
            result = new this(array[i], result);
        }

        return result;
    }
}

let list = List.fromArray([1, 2, 3, 4, 5, "h", "e", "l", "l", "o"]);
console.log(list);
// console.log(list.length);
// Recursion inside class List

// 1
// this = list
// let list = { value: 1, rest: { value: 2, rest: { value: 3, rest: null }}}; 
// this.rest = { value: 2, rest: { value: 3, rest: null }}; // node2 -> node which has value 2
// return 1 + (node2.length);
// node2.length calling a getter function length again in an object

// 2
// this.rest = { value: 3, rest: null }; // node3 -> node which has value 3
// return 1 + (1 + node3.length);
// node3.length calling a getter function length again in an object

// 3
// this.rest = null;
// return 1 + (1 + (1 + 0));
// if this.rest is null or not exists 0, so it returns 1 + 0 = 1;

// finally 
// return 1 + (1 + (1 + 0)); // 3


// class ListIterator {
//     constructor(list) {
//         this.list = list;
//     }

//     next() {
//         if (this.list == null) {
//             return { done: true };
//         }

//         let value = this.list.value;
//         this.list = this.list.rest;
//         return { value, done: false };

//     }
// }