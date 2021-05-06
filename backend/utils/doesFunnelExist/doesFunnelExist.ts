import { DynamoDB } from "@aws-sdk/client-dynamodb";
const dynamodb = new DynamoDB({ apiVersion: "2012-08-10" });

/**
 * @description Checks if a funnel exists
 * @param funnelId - The id of the funnel that you want to check
 * @returns true or false
 */
const doesFunnelExist = async (funnelId: string) => {
  const params = {
    TableName: "OpenATS", // TODO switch to parameter store?
    Key: {
      PK: { S: funnelId },
      SK: { S: funnelId },
    },
  };

  // TryCatch should be handled at the function level that will be calling this
  const response = await dynamodb.getItem(params);
  return response.Item ? response.Item : false;
};
export default doesFunnelExist;
