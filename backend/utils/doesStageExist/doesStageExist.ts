import { DynamoDB } from "@aws-sdk/client-dynamodb";
const dynamodb = new DynamoDB({ apiVersion: "2012-08-10" });

/**
 * @description Checks if a stage exists inside of a funnel
 * @param funnelId - The id of the funnel that you want to check
 * @param stageName - The stage name to check for (Questionnaire, Set Up Profile, etc.)
 * @returns true or false
 */
const doesStageExist = async (
  funnelId: string,
  stageName: string
): Promise<boolean> => {
  const params = {
    TableName: "OpenATS", // TODO switch to parameter store?
    Key: {
      PK: { S: funnelId },
      SK: { S: `STAGE_TITLE#${stageName}` },
    },
  };

  const response = await dynamodb.getItem(params);
  return response.Item ? true : false;
};
export default doesStageExist;
