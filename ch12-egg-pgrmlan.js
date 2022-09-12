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
function skipSpace(string) {
  // Look for non-whitespace
  let first = string.search(/\S/);
  // If the whole string is whitespace, return an empty string
  if (first === -1) {
    return "";
  }
  // Otherwise slice off the whitespace and return the rest of the string
  return string.slice(first);
}

function parse(program) {
  let { expr, rest } = parseExpression(program);
  if (skipSpace(rest).length > 0) {
    throw new SyntaxError("Unexpected text after program");
  }
  return expr;
}

console.log(parse("+(a, 10)"));
