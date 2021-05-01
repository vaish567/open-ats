import { getApplicant } from "./getApplicant";

// Succesfull
console.log("Success:");
console.log(getApplicant("11122233341112223334"));

// Failures
console.log("\nFailures:");
const failStates = ["", "ad2f2", 423423, null];

failStates.forEach((state) => console.log(getApplicant(state)));
