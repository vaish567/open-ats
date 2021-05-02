// NOTE
// NOTE
// NOTE
// This is an 'expensive' call
// At 4kb per applicant & 4 million applicants
// DynamoDB $0.25 per million reads
// Query returns 1mb / 4kb = 250 applicants per call
// 4 million / 250 applicants per call = 16,000 calls to get all
// Cost per call to get all applicants = $0.002 I think, too tired to do the math
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import * as Joi from "joi";
import { string, valid } from "joi";
const dynamodb = new DynamoDB({ apiVersion: "2012-08-10" });
const validSearches: string[] = ["Applicant", "Stage", "Funnel", "Question"];
const getAllByType = async (
  searchTerm: "Applicant" | "Stage" | "Funnel" | "Question"
) => {
  const validation = Joi.string()
    .required()
    .valid(...validSearches)
    .validate(searchTerm, {
      abortEarly: false,
      errors: {
        wrap: {
          label: "''",
        },
      },
    });

  if (validation.error) {
    return {
      message: `ERROR: ${validation.error.message}`,
    };
  }
  interface DBParams {
    TableName: string;
    IndexName: string;
    KeyConditionExpression: string;
    ExpressionAttributeNames?: {};
    ExpressionAttributeValues?: {};
    ExclusiveStartKey?: string | undefined;
  }
  let params: DBParams = {
    TableName: "OpenATS",
    IndexName: "AllByType",
    KeyConditionExpression: "#type = :v_type",
    ExpressionAttributeNames: {
      "#type": "TYPE",
    },
    ExpressionAttributeValues: {
      ":v_type": { S: searchTerm },
    },
    ExclusiveStartKey:  [key: string]: AttributeValue,
  };
  try {
    let results: any[] = [];

    do {
      let data = await dynamodb.query(params);
      if (!data.Items) return { message: `${searchTerm} not found` };

      data.Items.forEach((item) => results.push(item));
      params.ExclusiveStartKey = data.LastEvaluatedKey;
    } while (typeof data.LastEvaluatedKey !== "undefined");

    return results;
  } catch (error) {
    console.error(`Error getting ${searchTerm}`, error);
    return { message: `ERROR: ${error.message}` };
  }
};
export { getAllByType as default };
