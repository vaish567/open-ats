import Config from "../../../../config/GeneralConfig.js";
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import * as Joi from "joi";
const idLength: number = Config.ID_GENERATION_LENGTH;
const dynamodb = new DynamoDB(Config.DYNAMO_CONFIG);
const joiConfig = Config.JOI_CONFIG;

const getApplicant = async (
  id: string
): Promise<{ message: string | {}; status: number }> => {
  const validation = Joi.string()
    .required()
    .length(idLength)
    .validate(id, joiConfig);

  if (validation.error)
    return { message: `ERROR: ${validation.error.message}`, status: 400 };

  const params = {
    Key: {
      PK: {
        S: `APPLICANT#${id}`,
      },
      SK: {
        S: `APPLICANT#${id}`,
      },
    },
    TableName: "OpenATS", // TODO use parameter store?
  };
  try {
    const data = await dynamodb.getItem(params);
    if (!data.Item) return { message: "Applicant not found", status: 404 };
    return { message: data.Item, status: 200 };
  } catch (error) {
    console.error(`Error getting applicant by id ${id}`, error);
    return { message: `ERROR: ${error.message}`, status: 500 };
  }
};

export default getApplicant;
