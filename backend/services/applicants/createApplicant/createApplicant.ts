import { DynamoDB } from "@aws-sdk/client-dynamodb";
import * as Joi from "joi";
import { nanoid } from "nanoid";
const idLength = 25;
const dynamodb = new DynamoDB({ apiVersion: "2012-08-10" });
const joiConfig = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "''",
    },
  },
};
const ApplicantSchema = Joi.object({
  email: Joi.string().email().required(),
  first_name: Joi.string().required().max(50),
  last_name: Joi.string().required().max(50),
  phone_number: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  funnel_id: Joi.string(),
  stage: Joi.string(),
}).and(
  "email",
  "first_name",
  "last_name",
  "phone_number",
  "stage",
  "funnel_id"
);

// TODO add applicant types once schema has been laid out
// Fountain just uses a 'data' attribute and all custom data fields go in there
// Might be a good idea
const createApplicant = async (applicant): object => {
  // TS will yell at you in the meantime btw
  if (!applicant)
    return {
      message: `ERROR: 'applicant' is required`, // TODO Joi can take care of this i :thonk:
    };

  const validation = ApplicantSchema.validate(applicant, joiConfig);
  if (validation.error)
    return { message: `ERROR: ${validation.error.message}` };

  const applicantId = nanoid(idLength);
  // TODO check if stage exists first
  // TODO update ^ has been created, just need to import
  const params = {
    Item: {
      PK: { S: applicantId },
      SK: { S: applicantId },
      TYPE: { S: "Applicant" },
      APPLICANT_ID: { S: applicantId },
      CREATED_AT: { S: new Date().toISOString() },
      CURRENT_FUNNEL_ID: { S: "vlXTvxE9xOYpuNZfXDZuEQHFV" }, // TODO get funnel id's first
      CURRENT_FUNNEL_TITLE: { S: "Software Engineer" }, // TODO get funnel id's first
      CURRENT_STAGE_TITLE: { S: `STAGE_TITLE#${applicant.stage}` },
      EMAIL: { S: applicant.email },
      FIRST_NAME: { S: applicant.first_name },
      LAST_NAME: { S: applicant.last_name },
      FULL_NAME: { S: `${applicant.first_name} ${applicant.last_name}` },
      PHONE_NUMBER: { S: applicant.phone_number },
    },
    TableName: "OpenATS", // TODO parameter store???
  };

  try {
    await dynamodb.putItem(params);
    return {
      message: "Applicant created succesfully!",
    };
  } catch (error) {
    console.error(error);
    console.error(`An error occurred creating your applicant ${error.message}`);
  }
};

export default createApplicant;
