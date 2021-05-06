import doesFunnelExist from "../../../utils/doesFunnelExist/doesFunnelExist";
import doesStageExist from "../../../utils/doesStageExist/doesStageExist";
import Config from "../../../../config/GeneralConfig.js";
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import * as Joi from "joi";
const STAGE_DESCRIPTION_LENGTH: number = Config.STAGE_DESCRIPTION_MAX_LENGTH;
const STAGE_TITLE_LENGTH: number = Config.STAGE_TITLE_MAX_LENGTH;
const idLength: number = Config.ID_GENERATION_LENGTH;
const dynamodb = new DynamoDB(Config.DYNAMO_CONFIG);
const joiConfig = Config.JOI_CONFIG;

const StageSchema = Joi.object({
  STAGE_TITLE: Joi.string().required().max(STAGE_TITLE_LENGTH),
  DESCRIPTION: Joi.string().max(STAGE_DESCRIPTION_LENGTH),
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
        message: `ERROR: Stage ${stage.STAGE_TITLE} already exists in ${responseFunnel.FUNNEL_TITLE.S}, please choose another name or update the existing stage`,
      };

    // Creates the stage
    const params = {
      Item: {
        PK: { S: `FUNNEL#${stage.FUNNEL_ID}` },
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
        message: `ERROR: Unable to create your stage - ${error.message}`,
      };
    }
  } catch (error) {
    console.error(
      `A message occurred checking if funnel ID ${stage.FUNNEL_ID} exists, unable to create stage: ${stage.STAGE_TITLE} - ${error.message}`
    );
    return {
      message: `ERROR: Unable to check if funnel ID ${stage.FUNNEL_ID} exists, was not able to create stage '${stage.STAGE_TITLE}' - ${error.message}`,
    };
  }
};

export default createStage;
