const {
  createApplicant,
} = require("../functions/applicants/createApplicant.js");
describe("Applicants Service", function () {
  const email = "johnsmith@email.com";
  const first_name = "John";
  const last_name = "Valerio";
  const phone_number = "9999999999";
  test("Creates an applicant with an email, first_name, last_name and phone_number", () => {
    expect(
      createApplicant({
        email: email,
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number,
      })
    ).toStrictEqual({
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

  test("if email is blank", () => {
    expect(
      createApplicant({
        email: "",
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number,
      })
    ).toStrictEqual({
      message: "email cannot be blank",
    });
  });

  test("if email is an actual email", () => {
    expect(
      createApplicant({
        email: "jacob.net",
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number,
      })
    ).toStrictEqual({ message: "email is not an actual email" });
  });

  test("if email is a string", () => {
    expect(
      createApplicant({
        email: 12312312312,
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number,
      })
    ).toStrictEqual({
      message: "email is not a string",
    });
  });
  test("if email exists", () => {
    expect(
      createApplicant({
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number,
      })
    ).toStrictEqual({
      message: "email is required",
    });
  });

  test("if first name exists", () => {
    expect(
      createApplicant({
        email: email,
        last_name: last_name,
        phone_number: phone_number,
      })
    ).toStrictEqual({
      message: "first_name is required",
    });
  });

  test("if first name is a string", () => {
    expect(
      createApplicant({
        email: email,
        first_name: 13123,
        last_name: last_name,
        phone_number: phone_number,
      })
    ).toStrictEqual({
      message: "first_name must be a string",
    });
  });

  test("if first name is not empty", () => {
    expect(
      createApplicant({
        email: email,
        first_name: "",
        last_name: last_name,
        phone_number: phone_number,
      })
    ).toStrictEqual({
      message: "first_name cannot be empty",
    });
  });

  test("if first name is > 50 char", () => {
    expect(
      createApplicant({
        email: email,
        first_name:
          "8e7yi231edigweqifcgiaosgfhoiahsdoiuqysoidulhaisgfhkadglkasjgdoaiugdhkhjabdnkajhdbaosudghjabs,ndmakuhdjgasodhiasbdlkhasbdn",
        last_name: last_name,
        phone_number: phone_number,
      })
    ).toStrictEqual({
      message: "first_name cannot be larger than 50 characters",
    });
  });

  test("if last name exists", () => {
    expect(
      createApplicant({
        email: email,
        first_name: first_name,
        phone_number: phone_number,
      })
    ).toStrictEqual({
      message: "last_name is required",
    });
  });
  test("if last name is a string", () => {
    expect(
      createApplicant({
        email: email,
        first_name: first_name,
        last_name: ["134134"],
        phone_number: phone_number,
      })
    ).toStrictEqual({
      message: "last_name must be a string",
    });
  });

  test("if last name is not empty", () => {
    expect(
      createApplicant({
        email: email,
        first_name: first_name,
        last_name: "",
        phone_number: phone_number,
      })
    ).toStrictEqual({
      message: "last_name cannot be empty",
    });
  });

  test("if last name is > 50 char", () => {
    expect(
      createApplicant({
        email: email,
        first_name: first_name,
        last_name:
          "dsaljkndjlaknouih29uye7923yr7823yd827yhd2odkajhdouaishdoa78dyas087das78dya789dyasoduhaisd",
        phone_number: phone_number,
      })
    ).toStrictEqual({
      message: "last_name cannot be larger than 50 characters",
    });
  });

  test("if phone number exists", () => {
    expect(
      createApplicant({
        email: email,
        first_name: first_name,
        last_name: last_name,
      })
    ).toStrictEqual({ message: "phone_number is required" });
  });

  test("if phone number is 10 digits", () => {
    expect(
      createApplicant({
        email: email,
        first_name: first_name,
        last_name: last_name,
        phone_number: "14r4324",
      })
    ).toStrictEqual({ message: "phone_number must be 10 digits" });
  });

  test("if phone number is a string", () => {
    expect(
      createApplicant({
        email: email,
        first_name: first_name,
        last_name: last_name,
        phone_number: 1234567892,
      })
    ).toStrictEqual({ message: "phone_number must be a string" });
  });

  test("if phone number is empty", () => {
    expect(
      createApplicant({
        email: email,
        first_name: first_name,
        last_name: last_name,
        phone_number: "",
      })
    ).toStrictEqual({ message: "phone_number cannot be empty" });
  });
});
