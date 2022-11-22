#!/usr/bin/env node

import chalk from "chalk";
const args = process.argv;

let red = "#FF2E00";
let green = "#23CE6B";
let blue = "#496DDB";

const commands = ["new", "get", "complete", "help"];

// help guide
const usage = () => {
  const usageText = `
  ${chalk.bgHex(blue)(" Todo helps you manage your todo tasks ")}
  
  Usage: 

${chalk.hex(red)("    todo") + chalk.hex(green)(" [command]")}

  Available commands:
    
${
  chalk.hex(green)("     new") +
  "       -   " +
  chalk.hex(blue)("create a todo")
}
${
  chalk.hex(green)("     get") +
  "       -   " +
  chalk.hex(blue)("retrieve your todos")
}
${
  chalk.hex(green)("     complete") +
  "  -   " +
  chalk.hex(blue)("mark a todo as complete")
}
${
  chalk.hex(green)("     help") +
  "      -   " +
  chalk.hex(blue)("print this message")
}
`;

  console.log(usageText);
};

// log errors to the console
const errorLog = (error) => {
  const eLog = chalk.bgHex(red)(` ${error} `);
  console.log(`
  ${eLog}`);
};

// make sure length of the arguments array is exactly three
if (args.length > 3) {
  errorLog("Error: only one argument can be accepted");
  usage();
}

/* // check if passed argument is a valid command
if (commands.indexOf(args[2]) == -1) {
  errorLog("Error: Invalid command passed");
  usage();
}
*/

// switch statement to call functions based on what command is passed
switch (args[2]) {
  case "help":
    usage();
    break;
  case "new":
    break;
  case "get":
    break;
  case "complete":
    break;
  default:
    errorLog("Error: Invalid command passed");
    usage();
    break;
}

/* const rl = require("readline");

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ todos: [] }).write(); */