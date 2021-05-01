import { deleteApplicant } from "./deleteApplicant";

// Succesfull
console.log("Success:");
console.log(deleteApplicant("11122233341112223334"));

// Failures
console.log("\nFailures:");
const failStates = ["", "ad2f2", 423423, null];

failStates.forEach((state) => console.log(deleteApplicant(state)));
