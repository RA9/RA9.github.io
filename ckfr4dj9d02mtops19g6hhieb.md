## Comparing Arrays using isArrayEquals() method

---
title: Comparing Arrays using isArrayEquals() method
published: true
description: 
tags: #community #discuss #web #javascript
---

JavaScript is a great language that has endured a long struggle over the years. Yet it continues to shine despite all the criticisms. 

In this regard, I have decided to compare two arrays and see if they are equal. Equal in the sense of length and element within the array. In so doing I also take into consideration that the order of the elements doesn't matter.

Here is my code below: 
```js 
 const isArrayEquals = (arr1, arr2) => {
     let count = 0;
     for(let i = 0; i < arr1.length; i++) {
        for(let j = 0; j < arr2.length; j++) {
           if(arr1[i] == arr2[j]) {
                count++
           }
     }   
 }

 return  arr1.length == arr2.length && count == arr1.length ? true : false;
}


console.log(isArrayEquals([1, 2, 3, 4, 5], [1, 2, 5, 3, 4])) // true
console.log(isArrayEquals(["me", "you", "us"], ["us", "me"])) // false
console.log(isArrayEquals([], [])) // true
```
Well this might not be the best way to implement this but I think it will help in the process.

I've also implemented this and some other helper methods into a npm package called [rademe-js](https://www.npmjs.com/package/rademe-js).

Hope it helps and someday we might have Array.equals implemented into ECMA TC39 specification.