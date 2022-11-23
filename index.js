#!/usr/bin/env node

import chalk from "chalk";
const args = process.argv;

import rl from "readline";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

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
if (args.length > 3 && args[2] != "complete") {
  errorLog("Error: only one argument can be accepted");
  usage();
}

/* // check if passed argument is a valid command
if (commands.indexOf(args[2]) == -1) {
  errorLog("Error: Invalid command passed");
  usage();
}
*/

// File path
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, "db.json");

const adapter = new JSONFile(file);
const db = new Low(adapter);

// Read data from JSON file, set db.data content
await db.read();

const { todos } = db.data;

// write db.data content to db.json file
await db.write();

// Prompt user to input data
function prompt(question) {
  const r = rl.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  return new Promise((resolve, error) => {
    r.question(question, (answer) => {
      r.close();
      resolve(answer);
    });
  });
}

// Handle `new` command
const newTodo = () => {
  const q = chalk.bgHex(blue)("Type in your todo\n");
  prompt(q).then((todo) => {
    // make todo from prompt
    todos.push({
      title: todo,
      complete: false,
    });
    // write todo to db.json file
    db.write();
  });
};

// Handle `get` command
const getTodos = () => {
  let i = 1;
  todos.forEach((todo) => {
    const todoText = `${i++}. ${todo.title}`;
    console.log(todoText);
  });
};

// switch statement to call functions based on what command is passed
switch (args[2]) {
  case "help":
    usage();
    break;
  case "new":
    newTodo();
    break;
  case "get":
    getTodos();
    break;
  case "complete":
    break;
  default:
    errorLog("Error: Invalid command passed");
    usage();
    break;
}
