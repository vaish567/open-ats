import { DynamoDB } from "@aws-sdk/client-dynamodb";
const dynamodb = new DynamoDB({ apiVersion: "2012-08-10" });
import { nanoid } from "nanoid";
import * as Joi from "joi";
const idLength = 25;
const descriptionMaxLength = 2000;
const salaryTypes = ["Salary", "Hourly", "Dynamic"]; // TODO change to 'Pay' types once Dynamo schema has been changed
const JoiConfig = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "''",
    },
  },
};
const createFunnel = async (funnel: {
  title: string;
  description: string;
  locations: string[];
  pay: {
    isFixed: boolean;
    type: "Salary" | "Hourly" | "Dynamic";
    lowEnd: string;
    fixed: string;
    highEnd: string;
    currency: string;
  };
}) => {
  const FunnelSchema = Joi.object({
    title: Joi.string().required(),
    locations: Joi.array().items(Joi.string()).required(),
    description: Joi.string().max(descriptionMaxLength).required(),
    pay: Joi.object({
      // TODO
      isFixed: Joi.bool().required(), // TODO
      type: Joi.valid(...salaryTypes).required(), // TODO ------- some of these shouldn't be required
      lowEnd: Joi.string().required(), // TODO  ----------------  due to the different salary types
      fixed: Joi.string().required(), // TODO ------------------ If pay type = Salary,
      highEnd: Joi.string().required(), // TODO ---------------- then only 'fixed' should be here
      currency: Joi.string().length(3).required(), // TODO
    }),
  });

  const validation = FunnelSchema.validate(funnel, JoiConfig);
  if (validation.error) {
    return {
      message: `ERROR: ${validation.error.message}`,
    };
  }

  const newFunnelId: string = nanoid(idLength);
  const dynamoDBParams = {
    Item: {
      PK: { S: newFunnelId },
      SK: { S: newFunnelId },
      TYPE: { S: "Funnel" },
      LOCATIONS: { SS: funnel.locations },
      PAY_RANGE: {
        M: {
          isFixed: { BOOL: false }, // TODO destructure this, also, some might be optional. hmm :thonk:
          type: { S: funnel.pay.type }, // TODO destructure this
          lowEnd: { S: funnel.pay.lowEnd }, // TODO destructure this
          highEnd: { S: funnel.pay.highEnd }, // TODO destructure this
          fixed: { S: funnel.pay.fixed }, // TODO destructure this
          currency: { S: funnel.pay.currency }, // TODO destructure this
        },
      },
      DESCRIPTION: { S: funnel.description },
      FUNNEL_ID: { S: newFunnelId },
      FUNNEL_TITLE: { S: funnel.title },
    },
    TableName: "OpenATS", // TODO move to parameter store?
  };
  try {
    await dynamodb.putItem(dynamoDBParams);
    return { message: `Funnel  ${funnel.title} created!` };
  } catch (error) {
    console.error(error);
    return {
      message: `An error occurred creating your funnel ${error.message}`,
    };
  }
};

export default createFunnel;
