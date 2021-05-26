import doesFunnelExist from "../../../utils/doesFunnelExist/doesFunnelExist";
import doesStageExist from "../../../utils/doesStageExist/doesStageExist";
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { nanoid } from "nanoid";
import * as Joi from "joi";
const dynamodb = new DynamoDB(Config.DYNAMO_CONFIG);
const {ID_LENGTH, FIRST_NAME_MAX_LENGTH, LAST_NAME_MAX_LENGTH} = 
const joiConfig = Config.JOI_CONFIG;

const ApplicantSchema = Joi.object({
  email: Joi.string().email().required(),
  first_name: Joi.string().required().max(FIRST_NAME_MAX_LENGTH),
  last_name: Joi.string().required().max(LAST_NAME_MAX_LENGTH),
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
};

export default createApplicant;
