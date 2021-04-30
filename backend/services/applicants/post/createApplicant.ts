import Joi = require("joi");

const ApplicantSchema = Joi.object({
  email: Joi.string().email().required(),
  first_name: Joi.string().required().max(50),
  last_name: Joi.string().required().max(50),
  phone_number: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  funnel: Joi.string(),
  stage: Joi.string(),
}).and("email", "first_name", "last_name", "phone_number");
interface Applicant {
  /** The email of the applicant */
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  funnel?: string;
  stage?: string;
}

const createApplicant = (applicant: Applicant): object => {
  const validation = ApplicantSchema.validate(applicant, {
    abortEarly: false,
    errors: {
      wrap: {
        label: "''",
      },
    },
  });
  if (validation.error) {
    return {
      message: `ERROR: ${validation.error.message}`,
    };
  }
  const {
    email,
    first_name,
    last_name,
    phone_number,
    funnel,
    stage,
  } = applicant;
  return {
    message: "Applicant created succesfully!",
    applicant: {
      email: email,
      first_name: first_name,
      last_name: last_name,
      phone_number: phone_number,
      funnel: funnel ? funnel : null,
      stage: stage ? stage : null,
      created_at: Math.floor(Date.now() / 1000),
    },
  };
};

export { createApplicant as createApplicant };
