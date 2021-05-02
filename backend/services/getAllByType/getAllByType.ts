import { DynamoDB } from "@aws-sdk/client-dynamodb";
const dynamodb = new DynamoDB({ apiVersion: "2012-08-10" });
// NOTE - This is an expensive call, not recommended
//
const getAllByType = async (
  searchTerm: "Applicant" | "Stage" | "Funnel" | "Question"
) => {
  const params = {
    TableName: "OpenATS",
    IndexName: "AllByType",
    KeyConditionExpression: "#type = :v_type",
    ExpressionAttributeNames: {
      "#type": "TYPE",
    },
    ExpressionAttributeValues: {
      ":v_type": { S: searchTerm },
    },
  };
  try {
    const data = await dynamodb.query(params);

    if (!data.Items) return { message: `${searchTerm} not found` };

    return data.Items;
  } catch (error) {
    return { message: `ERROR: ${error.message}` };
  }
};
export { getAllByType as default };
