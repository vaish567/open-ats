import { getApplicant } from "./getApplicant";

const get = async () => {
  // Succesfull
  console.log("Success:");
  console.log(await getApplicant("3"));

  // Failures
  console.log("\nFailures:");
  const failStates: any = ["", "ad2f2", 423423, null];

  for (let state of failStates) {
    console.log(await getApplicant(state));
  }
};

get();
