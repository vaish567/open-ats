"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getApplicant_1 = require("./getApplicant");
// Succesfull
console.log("Success:");
console.log(getApplicant_1.getApplicant("11122233341112223334"));
// Failures
console.log("\nFailures:");
var failStates = ["", "ad2f2", 423423, null];
failStates.forEach(function (state) { return console.log(getApplicant_1.getApplicant(state)); });
