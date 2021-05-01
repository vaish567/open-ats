import * as Joi from "joi";
const idLength = 20;

const getApplicant = (id: string) => {
  if (!id) return { message: `ERROR: 'id' is required` };
  const validation = Joi.string()
    .required()
    .length(idLength)
    .validate(id, {
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

  return {
    message: "Applicant retrieved succesfully!",
    applicant: {
      email: "cowabunga@nickatnite.com",
      first_name: "James",
      last_name: "Jameson",
      id: id,
      phone_number: "8391823452",
      funnel: "Software Engineer",
      stage: "Document Upload",
      location: "Remote",
      created_at: new Date().toISOString(),
    },
  };
};

export { getApplicant as getApplicant };
