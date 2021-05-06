import { DynamoDB } from "@aws-sdk/client-dynamodb";
const dynamodb = new DynamoDB({ apiVersion: "2012-08-10" });
import { nanoid } from "nanoid";
import * as Joi from "joi";
const idLength = 25; // TODO make this a global variable?
const descriptionMaxLength = 2000; // TODO make this a global variable?
const salaryTypes = [
  "Salary",
  "Hourly",
  "Commission",
  "Dynamic (Per Delivery, Per Task, etc.)",
];
const JoiConfig = {
  // TODO make this a global variable? lol
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
    type:
      | "Salary"
      | "Hourly"
      | "Commission"
      | "Dynamic (Per Delivery, Per Task, etc.)";
    lowEnd?: string;
    highEnd?: string;
    fixed?: string;
    fixedDescription?: string;
    currency: string;
  };
}) => {
  const FunnelSchema = Joi.object({
    title: Joi.string().required(),
    locations: Joi.array().items(Joi.string()).required(),
    description: Joi.string().max(descriptionMaxLength).required(),
    pay: Joi.object({
      type: Joi.valid(...salaryTypes).required(),
      lowEnd: Joi.string(),
      highEnd: Joi.string(),
      fixed: Joi.string(),
      fixedDescription: Joi.string(),
      currency: Joi.string().length(3).required(),
    })
      .and("currency", "type") // Both are required
      .without("fixed", ["lowEnd", "highEnd"]) // Fixed cannot exist with lowEnd || highEnd
      .with("lowEnd", "highEnd") // If lowEnd exists, you must include highEnd
      .with("fixed", "fixedDescription") // If fixed exists, you must include fixedDescription
      .without("fixedDescription", ["lowEnd", "highEnd"]), // fixedDescription cannot appear next to lowEnd || highEnd
  });

  const validation = FunnelSchema.validate(funnel, JoiConfig);
  if (validation.error) {
    return {
      message: `ERROR: ${validation.error.message}`,
    };
  }

  const newFunnelId = nanoid(idLength);
  const {
    type,
    lowEnd,
    highEnd,
    currency,
    fixed,
    fixedDescription,
  } = funnel.pay;
  const params = {
    Item: {
      PK: { S: `FUNNEL#${newFunnelId}` },
      SK: { S: `FUNNEL#${newFunnelId}` },
      TYPE: { S: "Funnel" },
      LOCATIONS: { SS: funnel.locations },
      PAY_RANGE: {
        M: {
          type: { S: type },
          lowEnd: { S: lowEnd ? lowEnd : "" },
          highEnd: { S: highEnd ? highEnd : "" },
          fixed: { S: fixed ? fixed : "" },
          fixedDescription: { S: fixedDescription ? fixedDescription : "" },
          currency: { S: currency },
        },
      },
      DESCRIPTION: { S: funnel.description },
      FUNNEL_ID: { S: newFunnelId },
      FUNNEL_TITLE: { S: funnel.title },
    },
    TableName: "OpenATS", // TODO move to parameter store?
  };
  console.log(JSON.stringify(params));
  try {
    await dynamodb.putItem(params);
    return { message: `Funnel  ${funnel.title} created!` };
  } catch (error) {
    console.error(`Error occurred creating a funnel`, error);
    return {
      message: `ERROR: Unable to create your funnel - ${error.message}`,
    };
  }
};

export default createFunnel;
