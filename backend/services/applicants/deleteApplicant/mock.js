"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var deleteApplicant_1 = require("./deleteApplicant");
// Succesfull
console.log("Success:");
console.log(deleteApplicant_1.deleteApplicant("11122233341112223334"));
// Failures
console.log("\nFailures:");
var failStates = ["", "ad2f2", 423423, null];
failStates.forEach(function (state) { return console.log(deleteApplicant_1.deleteApplicant(state)); });
