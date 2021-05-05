import { DynamoDB } from "@aws-sdk/client-dynamodb";
import doesFunnelExist from "../../../utils/doesFunnelExist/doesFunnelExist";
import doesStageExist from "../../../utils/doesStageExist/doesStageExist";
import * as Joi from "joi";
const idLength = 25; // TODO move over to parameter store?
const stageTitleLength = 200;
const descriptionLength = 2000;
const joiConfig = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "''",
    },
  },
};
const dynamodb = new DynamoDB({ apiVersion: "2012-08-10" });

const StageSchema = Joi.object({
  STAGE_TITLE: Joi.string().required().max(stageTitleLength),
  DESCRIPTION: Joi.string().max(descriptionLength),
  FUNNEL_ID: Joi.string().required().length(idLength),
}).and("STAGE_TITLE", "FUNNEL_ID");
/**
 *
 * @param stage
 * @param STAGE_TITLE The stage title
 * @param DESCRIPTION The description of this stage and what it does
 * @param FUNNEL_ID The funnel ID of that this stage belongs to
 * @returns
 */
const createStage = async (stage: {
  STAGE_TITLE: string;
  DESCRIPTION: string;
  FUNNEL_ID: string;
}): Promise<{ message: string }> => {
  const validation = StageSchema.validate(stage, joiConfig);
  if (validation.error)
    return { message: `ERROR: ${validation.error.message}` };

  try {
    // Checks if funnel exists
    const responseFunnel = await doesFunnelExist(stage.FUNNEL_ID);
    if (!responseFunnel)
      return {
        message: `ERROR: Funnel ID ${stage.FUNNEL_ID} does not exist, please create it first before trying to make a stage inside of it`,
      };

    // Checks if there is a duplicate stage in this funnel already
    const responseStage = await doesStageExist(
      stage.FUNNEL_ID,
      stage.STAGE_TITLE
    );
    if (responseStage)
      return {
        message: `Stage ${stage.STAGE_TITLE} already exists in ${responseFunnel.FUNNEL_TITLE.S}, please choose another name or update the existing stage`,
      };

    // Creates the stage
    const params = {
      Item: {
        PK: { S: stage.FUNNEL_ID },
        SK: { S: `STAGE_TITLE#${stage.STAGE_TITLE}` },
        DESCRIPTION: { S: stage.DESCRIPTION },
        FUNNEL_TITLE: { S: `FUNNEL_TITLE#${responseFunnel.FUNNEL_TITLE.S}` },
        TYPE: { S: "Stage" },
      },
      TableName: "OpenATS",
    };

    try {
      await dynamodb.putItem(params);
      return {
        message: `Succesfully created stage ${stage.STAGE_TITLE} in ${responseFunnel.FUNNEL_TITLE.S}`,
      };
    } catch (error) {
      console.error(`An error occurred creating your stage - ${error.message}`);
      return {
        message: `An error occurred creating your stage - ${error.message}`,
      };
    }
  } catch (error) {
    console.error(
      `A message occurred checking if funnel ID ${stage.FUNNEL_ID} exists, unable to create stage: ${stage.STAGE_TITLE} - ${error.message}`
    );
    return {
      message: `A message occurred checking if funnel ID ${stage.FUNNEL_ID} exists, unable to create stage: ${stage.STAGE_TITLE} - ${error.message}`,
    };
  }
};

export default createStage;
