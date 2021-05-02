import { DynamoDB } from "@aws-sdk/client-dynamodb";
import * as Joi from "joi";
import { nanoid } from "nanoid";
const idLength = 25;

const dynamodb = new DynamoDB({ apiVersion: "2012-08-10" });

interface Funnel {
  title: string;
  locations: string[];
  description: string;
}
const createFunnel = async (funnel: Funnel) => {
  console.log("Creating funnel");
  const FunnelSchema = Joi.object({
    title: Joi.string().required(),
    locations: Joi.array().items(Joi.string()).default(["Remote"]),
    description: Joi.string()
      .max(2000)
      .default("This job does not have a description"),
  });

  const validation = FunnelSchema.validate(funnel, {
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

  const newFunnelId = nanoid(idLength).toString();

  let params = {
    Item: {
      PK: { S: newFunnelId },
      SK: { S: newFunnelId },
      TYPE: { S: "Funnel" },
      LOCATIONS: { SS: funnel.locations },
      SALARY_RANGE: {
        M: {
          isFixed: { BOOL: false },
          type: { S: "Salary" },
          lowEnd: { S: "90,000" },
          highEnd: { S: "170,000" },
          fixed: { S: "150,000" },
          currency: { S: "USD" },
        },
      },
      DESCRIPTION: { S: funnel.description },
      FUNNEL_ID: { S: newFunnelId },
      FUNNEL_TITLE: { S: funnel.title },
    },
    TableName: "OpenATS",
  };
  try {
    let x = await dynamodb.putItem(params);
    console.log(x);
    return { message: "Funnel  'funnel name here' created!" };
  } catch (error) {
    return {
      message: `An error occurred creating your funnel ${error.message}`,
    };
  }
};

export { createFunnel as default };
