## Variables in JavaScript?

In this article, we are going to learn the followings:
- What a variable is in programming?
- Initializing a variable in few programming languages
- Working with variables in JavaScript

## What is a variable in programming?
In programming, variables are a symbolic name that holds information or value stored and can reference a memory location. It can also manipulate the stored information in a computer program as well. 

### Amateur Scenario
Imagine a warehouse where we store goods and then wrap them in a box to stop them from spoiling. We place each of the goods into a box; We give the box a name (handle) and 
fit many goods into the box.

In the scenario above, the warehouse represents the storage. The goods represent the proposed store information; the box represents the variable, while the box name represents the `variable's name`, which can reference the variable's location in memory.


## Initializing a variable in few programming languages
Many programming languages are out there, and they all support variables. They have their own ways of initializing them. For example, to declare a variable in Python, you will need to set the variable's name and assign it a value (data types).

### Python Example: 
```
programming_language = "Python"
```
The above snippet showed how we could declare a variable in Python and adhere to the definition we provided at the beginning of this article. We first set the variable name as `programming_language,` and then assigned it a value called `Python.` 

We can also try initializing a variable in `C`. We will set the variable name and assign it a value.

### C Example:
```
char programming_language = "C"
```
The above snippet showed how we could declare a variable in C and adhere to the definition we provided at the beginning of this article. We first set the variable data type as `char` and variable name as `programming_language`, and we then assigned it a `C.` 

## Working with variables in JavaScript
Like those examples above, in JavaScript, we declare a variable by using the `variable's keyword`, then the name, and then assigning it a value.
There are three fundamental ways in which we can declare a variable in JavaScript, and we do it by using the `var`,  `let`, and `const` keywords. 

>Before `EmacScript 2015` or `ES6`, we normally declare a variable using the `var` keyword.


### Declaring variable using the `var` keyword
#### Example A
```js
var name = "Carlos";
```
In `Example A` above, we declare a variable called `name` and assigned it a value called `Carlos.` In JavaScript, when declaring a variable, anything on the right-hand side gets assigned to the left-hand side through the assignment operator, which is the `=` or the equal sign. We can safely say we're assigning `Carlos` to the `name` variable with that knowledge.

Any variable declared using the `var` keyword gets added to the global scope, which basically means it is accessible to the window's object in the browser or the global's object in NodeJS. That means if you have the variable `name` being used in multiple blocks in your program, it gets cumbersome.


#### Example B: 
```js
var name = "Carlos";

if (name.length >= 4) {
 var name = "Rambo";
 console.log ("My name is " + name)
}

console.log ("My name is " + name)
```

In `Example B`,  we have started with the first line by assigning the value `Carlos` to the `variable's name,` which we called `name.` I know the next block must be new to you if you're a beginner don't worry, we will get more details later. Basically, the next block sets a condition that states, "If the length of the variable  `name` has  4 characters or more characters re-declared `name` and assign it 
 a value `Rambo` in our case.".


### Let's talk about `const` and  `let` 

For *const* and *let*, the same way we've declared variables using the `var` keyword also applies, but they don't follow the global scope. They're block scope, when using `const` it serves as a constant and you can't reassign or redeclare its variable's identifier.  

For *let* it can be reassigned but can't be redeclared as we saw for `var`. Below are few examples of using `let` and and `const`.

#### Example C using `const`
```js
const name = "Carlos";
console.log('My name is ', name) //outputs => My name is Carlos

name = "Paul" // Uncaught TypeError: invalid assignment to const 'name'
```
Let's talk about the above example, we started by first declaring a variable called `name` using the `const` keyword and assigned it a value `Carlos` as a string. On the next line, we then logged a string containing the `const` variable `name` which gave us => "My name is Carlos". Lastly, we decided to reassign the variable `name` to a string called `Paul` but got an `Uncaught TypeError` which states that reassigning the variable  `name` to the string `Paul` is invalid. Like I said earlier you cannot reassign or redeclare a variable using `const`. Hope you remember that when dealing with variables using `const`.

#### Example D using `let`
```js
let name  = "Carlos";
console.log('My name is ', name) //outputs => My name is Carlos

name = "Paul" // name is now Paul
console.log('My name is ', name) //outputs => My name is Paul

let name = "John" // Uncaught SyntaxError: redeclaration of let name
```
Let's talk about the example above, we started by declaring a variable `name` using `let` and assign it a string `Carlos`. Next, we logged a string containing the `name` variable which gave us => `My name is Carlos`. Next, we reassign the variable `name` to the string `Paul` with any error because it accepts reassigning. Now, `name` holds the string `Paul`. Next, we logged a string containing the `name` variable which gave us => `My name is Paul`.  Lastly, we tried redeclaring `name` and assigning it a string `John` and got an error that redeclaring variable `name` will result in a `SyntaxError`.

### Summary
We talked about variables in programming and how it stored information, we moved on to talk about declaring variables in different programming languages and explained how each works. We then move on to talk about variables in JavaScript and how we can declare, assign, reassign variables in JavaScript. Now that you know how variables in JavaScript works, I have a few suggestions for you.

#### Suggestions
- Don't you ever use `var` going forward, it is cool if you know what you're doing but yeah there are so many wats in JavaScript. So, to be on the safe side always don't use it.
- When you are starting a project in JavaScript and don't know if a variable is going to change or not, use `const`. In fact, always declare your variable using `const`, if its values will change then you use `let`.

Thanks, for reading through, I am open to any suggestion.
Hope this helps you and will love to see some examples from you all in the comment below.
