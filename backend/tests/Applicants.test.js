describe("Applicants Service Test Suite", function () {
  const createApplicant = require("../functions/applicants/createApplicant");
  const email = "johnsmith@email.com";
  const first_name = "John";
  const last_name = "Valerio";
  const phone_number = 9999999999;
  test("Creates an applicant with an email, first_name, last_name and phone_number", () => {
    expect(
      createApplicant({
        email: email,
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number,
      })
    ).toBe({
      message: "Applicant created succesfully!",
      applicant: {
        email: email,
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number,
        created_at: Math.floor(Date.now() / 1000),
      },
    });
  });

  test("Checks for an invalid email", () => {
    expect(
      createApplicant({
        email: 31243124 || null || undefined || {} || ["asda"],
      })
    ).toBe({
      message: "Email is not valid",
    });
  });
});
