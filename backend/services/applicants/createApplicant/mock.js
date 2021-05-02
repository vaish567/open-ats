"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createApplicant_1 = require("./createApplicant");
// Succesfull
console.log("Succesful:");
// Failures
console.log("\nFailures:");
var failStates = [
    [],
    {},
    "",
    "ad2f2",
    423423,
    null,
    {
        email: "trombone",
        first_name: 32423,
        last_name: "uhfdaiouhfoiahfuiyhdufyadfuya09fdyua09s7duy0a98s7duy0a9s8dua09suyd90asuy97dysa90dyas9dy9syaud",
    },
];
failStates.forEach(function (state) { return console.log(createApplicant_1.createApplicant(state)); });
