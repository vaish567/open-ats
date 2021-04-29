import Joi from "joi";

const ApplicantSchema = Joi.object({
  email: Joi.string().email().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  phone_number: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
});
interface Applicant {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: number;
}

interface ResponseMsg {
  message: string;
}

const createApplicant = (applicant: Applicant) => {
  let validation = ApplicantSchema.validate(applicant);

  const { email, first_name, last_name, phone_number } = applicant;
  return validation;
};

export { createApplicant as createApplicant };
