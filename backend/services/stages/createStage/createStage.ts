import { DynamoDB } from "@aws-sdk/client-dynamodb";
import doesFunnelExist from "../../../utils/doesFunnelExist/doesFunnelExist";
import * as Joi from "joi";

const dynamodb = new DynamoDB({ apiVersion: "2012-08-10" });

/**
 *
 * @param stage
 * @param TITLE The stage title
 * @param DESCRIPTION The description of this stage and what it does
 * @param FUNNEL_ID The funnel ID of that this stage belongs to
 * @returns
 */
const createStage = async (stage: {
  TITLE: string;
  DESCRIPTION: string;
  FUNNEL_ID: string;
  FUNNEL_TITLE: string;
}): Promise<{ message: string }> => {
  try {
    const response = await doesFunnelExist(stage.FUNNEL_ID);

    if (!response)
      return {
        message: `ERROR: Funnel ID ${stage.FUNNEL_ID} does not exist, please create it first before trying to make a stage inside of it`,
      };

    const params = {
      Item: {
        PK: { S: stage.FUNNEL_ID },
        SK: { S: `STAGE_TITLE#${stage.TITLE}` },
        DESCRIPTION: { S: stage.DESCRIPTION },
        FUNNEL_TITLE: { S: `FUNNEL_TITLE#${response.FUNNEL_TITLE.S}` },
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
  } catch (error) {
    return {
      message: `A message occurred checking if funnel ID ${stage.FUNNEL_ID} exists - unable to create stage: ${stage.TITLE}`,
    };
  }
};

export default createStage;
