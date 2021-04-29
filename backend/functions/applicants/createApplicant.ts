import Joi from "joi";

const ApplicantSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "email is not a string",
    "string.email": "email is not an actual email",
    "string.empty": "email cannot be blank",
    "any.required": "email is required",
  }),

  first_name: Joi.string().required().max(50).messages({
    "string.base": "first_name must be a string",
    "string.empty": "first_name cannot be empty",
    "string.max": "first_name cannot be larger than 50 characters",
    "any.required": "first_name is required",
  }),
  last_name: Joi.string().required().max(50).messages({
    "string.base": "last_name must be a string",
    "string.empty": "last_name cannot be empty",
    "string.max": "last_name cannot be larger than 50 characters",
    "any.required": "last_name is required",
  }),
  phone_number: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.base": "phone_number must be a string",
      "string.empty": "phone_number cannot be empty",
      "string.length": "phone_number must be 10 digits",
      "any.required": "phone_number is required",
    }),
});
interface Applicant {
  /** The email of the applicant */
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
}

const createApplicant = (applicant: Applicant): object => {
  const validation = ApplicantSchema.validate(applicant);
  if (validation.error) {
    return { message: validation.error?.message };
  }
  const { email, first_name, last_name, phone_number } = applicant;
  return {
    message: "Applicant created succesfully!",
    applicant: {
      email: email,
      first_name: first_name,
      last_name: last_name,
      phone_number: phone_number,
      created_at: Math.floor(Date.now() / 1000),
    },
  };
};

export { createApplicant as createApplicant };
