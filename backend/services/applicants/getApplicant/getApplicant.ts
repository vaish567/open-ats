import * as Joi from "joi";
const idLength = 20;
import { DynamoDB } from "@aws-sdk/client-dynamodb";
const dynamodb = new DynamoDB({ apiVersion: "2012-08-10" });

const getApplicant = async (id: string) => {
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

  const params = {
    Key: {
      PK: {
        S: `APPLICANT#${id}`,
      },
      SK: {
        S: `APPLICANT#${id}`,
      },
    },
    TableName: "OpenATS",
  };
  // async/await.
  try {
    const data = await dynamodb.getItem(params);

    if (!data.Item) return { message: "Applicant not found" };
    const {
      FIRST_NAME,
      LAST_NAME,
      EMAIL,
      PHONE_NUMBER,
      APPLICANT_ID,
      FULL_NAME,
      CURRENT_FUNNEL,
      CURRENT_STAGE,
      CREATED_AT,
      FILES,
    } = data.Item;

    // Split the prefix from these fields
    const applicantID = APPLICANT_ID
      ? APPLICANT_ID.S?.split("APPLICANT#")[1]
      : undefined;
    const funnel = CURRENT_FUNNEL
      ? CURRENT_FUNNEL.S?.split("FUNNEL#")[1]
      : undefined;
    const stage = CURRENT_STAGE
      ? CURRENT_STAGE.S?.split("STAGE#")[1]
      : undefined;

    const applicant = {
      first_name: FIRST_NAME ? FIRST_NAME.S : undefined,
      last_name: LAST_NAME ? LAST_NAME.S : undefined,
      email: EMAIL ? EMAIL.S : undefined,
      phone_number: PHONE_NUMBER ? PHONE_NUMBER.S : undefined,
      id: applicantID ? applicantID : undefined,
      full_name: FULL_NAME ? FULL_NAME.S : undefined,
      funnel: funnel ? funnel : undefined,
      stage: stage ? stage : undefined,
      created_at: CREATED_AT ? CREATED_AT.S : undefined,
      files: FILES ? FILES.M : undefined,
    };
    return applicant;
  } catch (error) {
    return { message: `ERROR: ${error.message}` };
  }
};

export { getApplicant as getApplicant };
