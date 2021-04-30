const { createApplicant } = require("./createApplicant");

let x = createApplicant({
  email: "socasd@gmail.com",
  first_name: "John",
  last_name: "Smith",
  phone_number: "9991828414",
});

console.log(x);
