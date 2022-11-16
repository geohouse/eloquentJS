const { reverse } = require("./reverse");

// Index 2 is the actual command line argument (index 0 is 'node' and index 1 is the
// name of the script that's been called)
let argument = process.argv[2];

console.log(reverse(argument));
