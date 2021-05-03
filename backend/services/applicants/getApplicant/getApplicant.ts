import * as Joi from "joi";
const idLength = 25;
import { DynamoDB } from "@aws-sdk/client-dynamodb";
const dynamodb = new DynamoDB({ apiVersion: "2012-08-10" });
const joiConfig = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "''",
    },
  },
};
const getApplicant = async (id: string) => {
  const validation = Joi.string()
    .required()
    .length(idLength)
    .validate(id, joiConfig);

  if (validation.error)
    return { message: `ERROR: ${validation.error.message}` };

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
    if (!data.Item) return { message: "Applicant not found" };
    return data.Item;
  } catch (error) {
    console.error(`Error getting applicant by id ${id}`, error);
    return { message: `ERROR: ${error.message}` };
  }
};

export default getApplicant;
