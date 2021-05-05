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

  try {
    const response = await dynamodb.getItem(params);
    return response.Item ? response.Item : false;
  } catch (error) {
    console.error(
      `An error occurred checking if funnel ${funnelId} exists`,
      error
    );
  }
};
export default doesFunnelExist;
