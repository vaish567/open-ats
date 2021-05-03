import { DynamoDB } from "@aws-sdk/client-dynamodb";
import * as Joi from "joi";

const dynamodb = new DynamoDB({ apiVersion: "2012-08-10" });
const createStage = async (stage: {
  PK: string;
  TITLE: string;
  FUNNEL_ID: string;
  FUNNEL_TITLE: string;
}): Promise<{ message: string }> => {
  // TODO add validation here with Joi
  let params = {
    Item: {
      PK: { S: stage.FUNNEL_ID },
      FUNNEL_ID: { S: stage.FUNNEL_ID },
      FUNNEL_TITLE: { S: `FUNNEL_TITLE#${stage.FUNNEL_TITLE}` },
      SK: { S: `STAGE_TITLE#${stage.TITLE}` },
      TYPE: { S: "Stage" },
    },
    TableName: "OpenATS",
  };

  try {
    await dynamodb.putItem(params);
    return { message: `Succesfully created stage ${stage.TITLE}` };
  } catch (error) {
    return {
      message: `An error occurred creating your stage - ${error.message}`,
    };
  }
};

export default createStage;
