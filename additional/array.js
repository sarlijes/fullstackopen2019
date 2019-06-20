/*
var fruits = ['Apple', 'Banana', "Mango"];

fruits.forEach(function (item, index, array) {
    console.log(item, index, array);
});

// lisää loppuun: push; poista lopusta: pop
// lisää alkuun: unshift, poista alusta: shift

let first = fruits.shift();   // tai   fruits.shift();
console.log(fruits)
console.log(first)
fruits.shift();
console.log(fruits)

// indexOf 

var pos = fruits.indexOf('Banana');

fruits[5] = 'mango';
console.log(fruits[5]); // 'mango'
console.log('------', Object.keys(fruits))
    ;  // ['0', '1', '2', '5']
console.log(fruits.length); // 6

console.log("--------------")

*/
console.log("--------------")

// concat luo uuden kopion listasta

var fruits1 = ['Apple', 'Banana', "Mango"];
var fruits2 = fruits1.concat('Pear')

// The entries() method returns a new Array Iterator object 
// that contains the key/value pairs for each index in the array.

var array1 = ['a', 'b', 'c'];
var iterator1 = array1.entries();
console.log(iterator1.next().value);
// expected output: Array [0, "a"]
console.log(iterator1.next().value);
// expected output: Array [1, "b"]
console.log("--------------")

// The every() method tests whether all elements in the array pass 
// the test implemented by the provided function. It returns a Boolean value. 

function isBelowThreshold(currentValue) {
    return currentValue < 40;
}

var array1 = [1, 30, 39, 29, 10, 13];

console.log(array1.every(isBelowThreshold));
  // expected output: true

  //The fill() method fills (modifies) all the elements of an array

  var array1 = [1, 2, 3, 4];

// fill with 0 from position 2 until position 4
console.log(array1.fill(0, 2, 4));
// expected output: [1, 2, 0, 0]

var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);

console.log(result);







