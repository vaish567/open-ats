import * as Joi from "joi";
const idLength = 20;

const deleteApplicant = (id: string) => {
  if (!id) return { message: `ERROR: 'id' not provided - Received: ${id}` }; // Check for falsy values
  const validation = Joi.string()
    .required()
    .length(idLength)
    .messages({
      "string.base": `'id' is not a string - Received: ${typeof id}`,
      "string.length": `'id' length is not ${idLength} - Received length: ${id.length}`,
    })
    .validate(id);

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

export { deleteApplicant as deleteApplicant };
