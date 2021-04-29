const {
  createApplicant,
} = require("./backend/functions/applicants/createApplicant");

let app = {
  email: "jdaojd@gmail.com",
  first_name: "sad",
  last_name: "lasd",
  phone_number: "3432423334",
};
let x = createApplicant(app);

console.log(x);
