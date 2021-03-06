/**
 * Checkbox list examples
 */

"use strict";
var inquirer = require("inquirer");

inquirer.prompt([
  {
    type: "checkbox",
    message: "Select toppings",
    name: "toppings",
    choices: [
      new inquirer.Separator("The usual:"),
      {
        name: "Peperonni"
      },
      {
        name: "Cheese",
        checked: true
      },
      {
        name: "Mushroom"
      },
      new inquirer.Separator("The extras:"),
      {
        name: "Pineapple",
      },
      {
        name: "Bacon"
      },
      {
        name: "Olives",
        disabled: "out of stock"
      },
      {
        name: "Extra cheese"
      }
    ],
    validate: function( answer ) {
      if ( answer.length < 1 ) {
        return "You must choose at least one topping.";
      }
      return true;
    }
  }
], function( answers ) {
  console.log( JSON.stringify(answers, null, "  ") );
});
