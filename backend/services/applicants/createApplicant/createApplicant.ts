import doesFunnelExist from "../../../utils/doesFunnelExist/doesFunnelExist";
import doesStageExist from "../../../utils/doesStageExist/doesStageExist";
import Config from "../../../../config/GeneralConfig.js";
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { nanoid } from "nanoid";
import * as Joi from "joi";
const dynamodb = new DynamoDB(Config.DYNAMO_CONFIG);
const idLength = Config.ID_GENERATION_LENGTH;
const joiConfig = Config.JOI_CONFIG;

const ApplicantSchema = Joi.object({
  email: Joi.string().email().required(),
  first_name: Joi.string().required().max(Config.FIRST_NAME_MAX_LENGTH),
  last_name: Joi.string().required().max(Config.LAST_NAME_MAX_LENGTH),
  phone_number: Joi.string()
    .length(10) // TODO add international support
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
}): Promise<{ message: string | {}; status: number }> => {
  // TS will yell at you in the meantime btw
  const validation = ApplicantSchema.validate(applicant, joiConfig);
  if (validation.error)
    return { message: `ERROR: ${validation.error.message}`, status: 400 };

  try {
    const [funnelExists, stageExists] = await Promise.all([
      doesFunnelExist(applicant.funnel_id),
      doesStageExist(applicant.funnel_id, applicant.stage_title),
    ]);

    if (!funnelExists || !stageExists)
      return {
        message: `ERROR: The funnel + stage combination in which you are trying to place this applicant in (Funnel ID: '${applicant.funnel_id}' / Stage Title: '${applicant.stage_title}') does not exist`,
        status: 404,
      };

    try {
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
      await dynamodb.putItem(params);
      return {
        message: "Applicant created succesfully!",
        status: 201,
      };
    } catch (error) {
      console.error(error);
      return {
        message: `ERROR: Unable to create your applicant - ${error.message}`,
        status: 500,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      message: `An error occurred checking if funnel ${applicant.funnel_id} exists`,
      status: 500,
    };
  }
};

export default createApplicant;
