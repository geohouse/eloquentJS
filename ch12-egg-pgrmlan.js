// Egg programming language

// expressions type 'value' are literal strings or numbers
// {type: "value", value:5}

// expressions type 'word' are used for identifiers (names).
// {type: "word", name: ">"}

// expressions type 'apply' represent applications.
// have 'operator' property to give the expression being applied.
// have 'args' property to hold an array of argument expressions
// {type: "apply",
// operator: {type: "word", name: ">"},
// args: [
//    {type: "word", name: "x"},
//    {type: "value", value: 5}
// ]}

// Above would represent the >(x,5) expression

function parseApply(expr, program) {
  program = skipSpace(program);
  if (program[0] != "(") {
    return { expr: expr, rest: program };
  }
  // Remove the opening parentheses then skip any other leading spaces
  program = skipSpace(program.slice(1));
  expr = { type: "apply", operator: expr, args: [] };
  while (program[0] != ")") {
    // calls parseExpression, which in turn re-calls parseApply
    let arg = parseExpression(program);
    expr.args.push(arg.expr);
    program = skipSpace(arg.rest);
    if (program[0] === ",") {
      program = skipSpace(program.slice(1));
    } else if (program[0] !== ")") {
      throw new SyntaxError("Expected ',' or ')'");
    }
  }
  return parseApply(expr, program.slice(1));
}

function parseExpression(program) {
  program = skipSpace(program);
  let match, expr;
  // string
  if ((match = /^"([^"]*)"/.exec(program))) {
    // match[1] returns the match for the first (and only, in this case), capturing group
    expr = { type: "value", value: match[1] };
  } else if ((match = /^\d+\b/.exec(program))) {
    // number
    expr = { type: "value", value: Number(match[0]) };
  } else if ((match = /^[^\s(),#"]+/.exec(program))) {
    // word
    expr = { type: "word", name: match[0] };
  } else {
    throw new SyntaxError(`Unexpected syntax: ${program}`);
  }
  // slice off the matching part of the program parame
  return parseApply(expr, program.slice(match[0].length));
}

// strip leading spaces off the program string
// Also remove any hash signs so that those can act like comments
function skipSpace(string) {
  // Look for non-whitespace and comments
  let toSkip = string.match(/^(\s|#.*)*/);
  // If the whole string is whitespace, return an empty string
  //   if (first === -1) {
  //     return "";
  //   }
  // Otherwise slice off the whitespace and return the rest of the string
  return string.slice(toSkip[0].length);
}

// parses input into syntax tree for use with evaluator (below)
function parse(program) {
  let { expr, rest } = parseExpression(program);
  if (skipSpace(rest).length > 0) {
    throw new SyntaxError("Unexpected text after program");
  }
  return expr;
}

console.log(parse("+(a, 10)"));

const specialForms = Object.create(null);

specialForms.if = (args, scope) => {
  if (args.length !== 3) {
    throw new SyntaxError("Wrong number of args to if");
  } else if (evaluate(args[0], scope) !== false) {
    return evaluate(args[1], scope);
  } else {
    return evaluate(args[2], scope);
  }
};

specialForms.while = (args, scope) => {
  if (args.length !== 2) {
    throw new SyntaxError("Wrong number of args to while");
  }
  while (evaluate(args[0], scope) !== false) {
    evaluate(args[1], scope);
  }
  // Egg doesn't use undefined, so return false here to show that it's returned
  return false;
};

specialForms.do = (args, scope) => {
  let value = false;
  for (let arg of args) {
    value = evaluate(arg, scope);
  }
  return value;
};

// Create 'define' method to create new bindings and assign them values

specialForms.define = (args, scope) => {
  if (args.length !== 2 || args[0].type != "word") {
    throw new SyntaxError("Incorrect use of define");
  }
  let value = evaluate(args[1], scope);
  scope[args[0].name] = value;
  return value;
};

// Create a 'set' method that updates the value of an existing binding
specialForms.set = (args, scope) => {
  if (args.length !== 2 || args[0].type !== "word") {
    throw new SyntaxError("Bad use of set.");
  }
  let varName = args[0].name;
  let varValue = evaluate(varName, scope);
  // This for loop runs until loopScope is null, which happens at the top of the scope object
  // inheritance where .getPrototypeOf() will set loopScope to null.
  for (
    let loopScope = scope;
    loopScope;
    loopScope = Object.getPrototypeOf(loopScope)
  ) {
    if (Object.prototype.hasOwnProperty.call(loopScope, varName)) {
      loopScope[varName] = varValue;
      return varValue;
    }
  }
  // If code reaches here, then no variable of that name has been located in any of the
  // parent scopes, so throw an error message.
  throw new ReferenceError(
    `Can't update binding for ${args[0].name} because it's not already defined using 'define'`
  );
};

// specialForms.set = (args, scope) => {
//   let scopeParent = Object.getPrototypeOf(scope);
//   console.log({ scopeParent });
//   console.log(args[0].name);
//   if (Object.prototype.hasOwnProperty.call(scopeParent, args[0].name)) {
//     let value = evaluate(args[1], scope);
//     console.log({ value });
//     scopeParent[args[0].name] = value;
//   } else {
//     throw new ReferenceError(
//       `Can't update binding for ${args[0].name} because it's not already defined using 'define'`
//     );
//   }
// };

// Create a function construct where its last arg will be the function's body, and all args before that
// are assumed to be names of the function parameters

specialForms.fun = (args, scope) => {
  if (!args.length) {
    throw new SyntaxError("Functions need a body");
  }
  let body = args[args.length - 1];
  let params = args.slice(0, args.length - 1).map((expr) => {
    if (expr.type != "word") {
      throw new SyntaxError("Parameter names must be words");
    }
    return expr.name;
  });

  return function () {
    if (arguments.length !== params.length) {
      throw new TypeError("Wrong number of arguments.");
    }
    // This allows formations of closures - the prototype of the local scope is the scope where this function was created.
    let localScope = Object.create(scope);
    console.log("arguments is: ");
    console.log(arguments);
    // Pack the arguments to the function into the local scope, which is then passed to the evaluate call.
    for (let index = 0; index < arguments.length; index++) {
      localScope[params[index]] = arguments[index];
    }
    return evaluate(body, localScope);
  };
};

// The scope object properties are names that correspond to the binding names, and values correspond
// to the values of those bindings
const topScope = Object.create(null);
// Add booleans to the scope
topScope.true = true;
topScope.false = false;

// Add math operators to the scope
for (let op of ["+", "-", "*", "/", "==", "===", "<", ">"]) {
  topScope[op] = Function("a, b", `return a ${op} b;`);
}

// set a print method
topScope.print = (value) => {
  console.log(value);
  return value;
};

// add support for arrays

topScope.array = (...values) => values;

topScope.length = (inputArray) => inputArray.length;

topScope.element = (array, n) => array[n];

let prog = parse(`if(true, false, true)`);
console.log(evaluate(prog, topScope));

// The score object associates names with the values to use
function evaluate(expr, scope) {
  if (expr.type === "value") {
    return expr.value;
  } else if (expr.type === "word") {
    // testing if expr.name is in the keys of the scope object
    if (expr.name in scope) {
      return scope[expr.name];
    } else {
      throw new ReferenceError(`Undefined binding: ${expr.name}`);
    }
  } else if (expr.type === "apply") {
    let { operator, args } = expr;
    if (operator.type === "word" && operator.name in specialForms) {
      return specialForms[operator.name](expr.args, scope);
    } else {
      // recursive call
      let op = evaluate(operator, scope);
      if (typeof op === "function") {
        return op(...args.map((arg) => evaluate(arg, scope)));
      } else {
        throw new TypeError("Applying a non-function.");
      }
    }
  }
}

// parse a program and run it in a fresh scope
function run(program) {
  return evaluate(parse(program), Object.create(topScope));
}

// for loop for sum of ints from 0 to 10.
run(`
do(define(total, 0),
define(count, 1),
while(<(count,11),
do(define(total, +(total, count)),
define(count, +(count, 1)))),
print(total))`);

// testing functions
run(`do(define(plusOne, fun(a, +(a,1))),
print(plusOne(10)))`);

run(`do(define(power, fun(base, exp, 
    if(==(exp,0),
    1,
    *(base, power(base, -(exp, 1)))))),
    print(power(2,10)))`);

// testing array functionality
run(`
do(define(sum, fun(array,
    do(define(i,0),
    define(sum, 0),
    while(<(i, length(array)),
    do(define(sum, +(sum, element(array,i))),
    define(i, +(i,1)))),
    sum))),
    print(sum(array(1,2,3))))`);

// testing for closures

run(`
do(define(f, fun(a, fun(b, +(a,b)))),
print(f(4)(5)))`);

// testing for comments with '#'

console.log(parse("# hello\nx"));
console.log(parse("a # one\n # two\n()"));

// Testing the specialForms.set functionality to update bindings
run(`
do(define(x,4),
define(setx, fun(val, set(x, val))),
setx(50),
print(x))`);

run(`set(quux, true)`);
