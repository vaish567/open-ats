import * as Joi from "joi";
const idLength = 20;

const deleteApplicant = (id: string) => {
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
    message: "Applicant deleted succesfully!",
    id: id,
  };
};

export { deleteApplicant as default };
