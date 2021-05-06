import { DynamoDB } from "@aws-sdk/client-dynamodb";
import * as Joi from "joi";
import { nanoid } from "nanoid";
import doesFunnelExist from "../../../utils/doesFunnelExist/doesFunnelExist";
import doesStageExist from "../../../utils/doesStageExist/doesStageExist";

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
  stage_title: Joi.string(),
}).and(
  "email",
  "first_name",
  "last_name",
  "phone_number",
  "stage_title",
  "funnel_id"
);

// TODO add applicant types once schema has been laid out
// Fountain just uses a 'data' attribute and all custom data fields go in there
// Might be a good idea
const createApplicant = async (applicant: {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  stage_title: string;
  funnel_id: string;
}) => {
  // TS will yell at you in the meantime btw
  const validation = ApplicantSchema.validate(applicant, joiConfig);
  if (validation.error)
    return { message: `ERROR: ${validation.error.message}` };

  const [funnelExists, stageExists] = await Promise.all([
    doesFunnelExist(applicant.funnel_id),
    doesStageExist(applicant.funnel_id, applicant.stage_title),
  ]);

  if (!funnelExists || !stageExists)
    return {
      message: `ERROR: The funnel + stage combination in which you are trying to place this applicant in (Funnel ID: '${applicant.funnel_id}' / Stage Title: '${applicant.stage_title}') does not exist`,
    };

  const applicantId = nanoid(idLength);

  const params = {
    Item: {
      PK: { S: `APPLICANT#${applicantId}` },
      SK: { S: `APPLICANT#${applicantId}` },
      TYPE: { S: "Applicant" },
      APPLICANT_ID: { S: applicantId },
      CREATED_AT: { S: new Date().toISOString() },
      CURRENT_FUNNEL_ID: { S: applicant.funnel_id },
      CURRENT_FUNNEL_TITLE: { S: funnelExists.FUNNEL_TITLE.S! },
      // Without exclamation mark, TS will throw an error ^
      // We can guarantee that if a funnel exists, it will have a title
      CURRENT_STAGE_TITLE: { S: `STAGE_TITLE#${applicant.stage_title}` },
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
    return {
      message: `ERROR: Unable to create your applicant - ${error.message}`,
    };
  }
};

export default createApplicant;
